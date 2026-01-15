import { pgTable, uuid, text, timestamp, integer, decimal, boolean, date, uniqueIndex } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';

// Users table - linked to Clerk authentication
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  clerkUserId: text('clerk_user_id').notNull().unique(), // Links to Clerk user ID
  email: text('email'),
  username: text('username'),
  firstName: text('first_name'),
  lastName: text('last_name'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
});

// Exercises table - defines different exercises
export const exercises = pgTable('exercises', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: text('name').notNull(), // e.g., "Bench Press", "Squats"
  createdAt: timestamp('created_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
});

// Workouts table - tracks workout sessions
export const workouts = pgTable('workouts', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(), // e.g., "Chest Day", "Leg Day"
  date: date('date').notNull(), // Date of the workout
  startedAt: timestamp('started_at', { withTimezone: true }), // When the workout started
  completedAt: timestamp('completed_at', { withTimezone: true }), // When the workout ended
  createdAt: timestamp('created_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
});

// Workout Exercises table - junction table linking workouts with exercises
export const workoutExercises = pgTable('workout_exercises', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  workoutId: uuid('workout_id')
    .notNull()
    .references(() => workouts.id, { onDelete: 'cascade' }),
  exerciseId: uuid('exercise_id')
    .notNull()
    .references(() => exercises.id, { onDelete: 'cascade' }),
  order: integer('order').default(0), // Order of exercises in the workout
  createdAt: timestamp('created_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
});

// Sets table - tracks individual sets within exercises
export const sets = pgTable('sets', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  workoutExerciseId: uuid('workout_exercise_id')
    .notNull()
    .references(() => workoutExercises.id, { onDelete: 'cascade' }),
  setNumber: integer('set_number').notNull(), // Set number (1st set, 2nd set, etc.)
  weight: decimal('weight', { precision: 6, scale: 2 }), // Weight in kg/lbs
  reps: integer('reps'), // Number of repetitions
  completed: boolean('completed').default(true), // Whether the set was completed
  createdAt: timestamp('created_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
});

// Indexes for performance optimization
// Note: Commenting out all unique indexes due to JSON parsing issue
// export const idxWorkoutsUserIdDate = uniqueIndex('idx_workouts_user_id_date').on(workouts.userId, workouts.date);
// export const idxUsersClerkUserId = uniqueIndex('idx_users_clerk_user_id').on(users.clerkUserId);

// Relationships
export const workoutsRelations = relations(workouts, ({ one, many }) => ({
  user: one(users, {
    fields: [workouts.userId],
    references: [users.id],
  }),
  workoutExercises: many(workoutExercises),
}));

export const exercisesRelations = relations(exercises, ({ many }) => ({
  workoutExercises: many(workoutExercises),
}));

export const workoutExercisesRelations = relations(workoutExercises, ({ one, many }) => ({
  workout: one(workouts, {
    fields: [workoutExercises.workoutId],
    references: [workouts.id],
  }),
  exercise: one(exercises, {
    fields: [workoutExercises.exerciseId],
    references: [exercises.id],
  }),
  sets: many(sets),
}));

export const setsRelations = relations(sets, ({ one }) => ({
  workoutExercise: one(workoutExercises, {
    fields: [sets.workoutExerciseId],
    references: [workoutExercises.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  workouts: many(workouts),
}));