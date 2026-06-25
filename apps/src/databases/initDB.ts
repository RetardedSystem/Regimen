import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("app.db");

export async function initDB() {
  // Goals Table
  await db.execAsync(`
    DROP TABLE IF EXISTS goals;
    CREATE TABLE goals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        parent_goal_id INTEGER,

        title TEXT NOT NULL,
        description TEXT,
        domain TEXT NOT NULL CHECK (
            domain IN (
                'personal',
                'career',
                'health',
                'finance',
                'education',
                'entertainment',
                'social'
            )
        ),
       start_date DATE,
        completed_at DATETIME,
        deadline DATETIME,

        status TEXT NOT NULL DEFAULT 'in_progress'
        CHECK (
            status IN (
                'in_progress',
                'done'
            )
        ),

        FOREIGN KEY(parent_goal_id)
            REFERENCES goals(id)
    );
  `);

  // Tasks Table
  await db.execAsync(`
    DROP TABLE IF EXISTS tasks;    
    CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    title TEXT NOT NULL,

    description TEXT,

    status TEXT NOT NULL DEFAULT 'todo'
    CHECK (
        status IN (
            'todo',
            'in_progress',
            'done',
            'missed'
        )
    ),

    start_date DATETIME,

    deadline DATETIME,

    completed_at DATETIME,

    priority INTEGER DEFAULT 2
    CHECK(priority BETWEEN 1 AND 3),
  
    date DATE DEFAULT CURRENT_DATE,

    -- Recurrence
    is_recurring BOOLEAN NOT NULL DEFAULT 0,

    recurrence_type TEXT DEFAULT NULL
    CHECK (
        recurrence_type IN (
            'daily',
            'weekly',
            'monthly',
            'yearly'
        )
        OR recurrence_type IS NULL
    ),

    recurrence_days TEXT DEFAULT NULL,

    -- Link to Goals table
    goal_id INTEGER DEFAULT 1,

    FOREIGN KEY (goal_id)
    REFERENCES goals(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
  );
  `);

  // Task Instances Table
  await db.execAsync(`
    DROP TABLE IF EXISTS task_instances;
    CREATE TABLE IF NOT EXISTS task_instances(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id INTEGER NOT NULL,
    instance_date DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'todo'
    CHECK(
      status IN(
        'todo',
        'in_progress',
        'done',
        'missed'
      )
    ),
    FOREIGN KEY(task_id)
        REFERENCES tasks(id)
        ON DELETE CASCADE
  );
  `);

  //Users Table
  await db.execAsync(`  
    DROP TABLE IF EXISTS users; 
    CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE,
    avatar_id INTEGER,
    xp INTEGER NOT NULL DEFAULT 0,
    streak_days INTEGER NOT NULL DEFAULT 0,

    FOREIGN KEY(avatar_id)
        REFERENCES avatars(id)
        ON DELETE SET NULL
  );
  `);

  //Avatars Table
  await db.execAsync(`
        DROP TABLE IF EXISTS avatars;
        CREATE TABLE IF NOT EXISTS avatars(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    unlock_xp INTEGER NOT NULL DEFAULT 0
  );
  `);
  // Test Inserts for Goals Table Hierarchy
  await db.execAsync(`
    DELETE FROM goals;

    INSERT INTO goals (
      id,
      parent_goal_id,
      title,
      domain,
      start_date,
      completed_at,
      deadline
    )
    VALUES
      -- Root Goal
      (1, NULL, 'IIT JAM Mathematics', 'education', '2026-06-20 09:15:00', NULL, '2027-01-15 14:30:00'),

      -- Main Subjects
      (2, 1, 'Higher Algebra', 'education', '2026-06-20 08:45:00', NULL, '2026-08-01 16:20:00'),
      (3, 1, 'Calculus', 'education', '2026-06-20 10:30:00', NULL, '2026-10-01 13:45:00'),
      (4, 1, 'Real Analysis', 'education', '2026-08-01 07:15:00', NULL, '2026-11-01 15:00:00'),
      (5, 1, 'Linear Algebra', 'education', '2026-08-01 11:20:00', NULL, '2026-11-15 17:45:00'),
      (6, 1, 'Differential Equations', 'education', '2026-11-01 09:00:00', NULL, '2026-12-01 18:30:00'),
      (7, 1, 'Abstract Algebra', 'education', '2026-10-15 14:15:00', NULL, '2026-12-15 12:00:00'),
      (8, 1, 'IIT JAM Practice', 'education', '2026-11-15 10:45:00', NULL, '2027-01-15 19:15:00'),

      -- Higher Algebra
      (9, 2, 'Complex Numbers', 'education', '2026-06-20 13:30:00', '2026-06-23 15:45:00', '2026-07-01 11:00:00'),
      (100, 9, 'Roots of Unity', 'education', '2026-06-25 09:30:00', '2026-06-24 16:20:00', '2026-07-05 14:15:00'),
      (101, 9, 'De Moivre Theorem', 'education', '2026-07-01 08:00:00', NULL, '2026-07-10 17:30:00'),
      (10, 2, 'Theory of Equations', 'education', '2026-06-25 12:45:00', NULL, '2026-07-10 10:15:00'),
      (11, 2, 'Binomial Theorem', 'education', '2026-07-01 15:30:00', NULL, '2026-07-15 13:20:00'),
      (12, 2, 'Multinomial Theorem', 'education', '2026-07-10 11:00:00', NULL, '2026-07-20 16:45:00'),
      (13, 2, 'Inequalities', 'education', '2026-07-15 09:45:00', NULL, '2026-08-01 18:00:00'),

      -- Calculus
      (14, 3, 'Functions', 'education', '2026-06-20 14:20:00', NULL, '2026-06-30 12:30:00'),
      (15, 3, 'Limits', 'education', '2026-06-30 10:00:00', NULL, '2026-07-15 15:45:00'),
      (16, 3, 'Continuity', 'education', '2026-07-15 13:15:00', NULL, '2026-07-25 11:30:00'),
      (17, 3, 'Differentiation', 'education', '2026-07-25 08:30:00', NULL, '2026-08-20 14:00:00'),
      (18, 3, 'Applications of Derivatives', 'education', '2026-08-20 16:15:00', NULL, '2026-09-01 10:45:00'),
      (19, 3, 'Integration', 'education', '2026-09-01 09:30:00', NULL, '2026-09-20 17:20:00'),
      (20, 3, 'Techniques of Integration', 'education', '2026-09-10 12:00:00', NULL, '2026-09-30 15:15:00'),
      (21, 3, 'Sequences and Series', 'education', '2026-09-15 10:45:00', NULL, '2026-10-01 13:00:00'),
      (22, 3, 'Multivariable Calculus', 'education', '2026-09-20 14:30:00', NULL, '2026-10-10 16:30:00'),

      -- Real Analysis
      (23, 4, 'Logic and Proofs', 'education', '2026-08-01 08:15:00', NULL, '2026-08-15 14:45:00'),
      (24, 4, 'Real Numbers', 'education', '2026-08-10 11:45:00', NULL, '2026-08-25 10:30:00'),
      (25, 4, 'Sequences', 'education', '2026-08-20 13:20:00', NULL, '2026-09-15 15:50:00'),
      (26, 4, 'Limits', 'education', '2026-09-01 09:00:00', NULL, '2026-09-20 12:15:00'),
      (27, 4, 'Continuity', 'education', '2026-09-15 14:30:00', NULL, '2026-10-01 17:00:00'),
      (28, 4, 'Differentiation', 'education', '2026-10-01 10:20:00', NULL, '2026-10-20 13:45:00'),
      (29, 4, 'Riemann Integration', 'education', '2026-10-15 15:00:00', NULL, '2026-11-01 11:15:00'),

      -- Linear Algebra
      (30, 5, 'Vector Spaces', 'education', '2026-08-01 09:30:00', NULL, '2026-08-20 16:00:00'),
      (31, 5, 'Subspaces', 'education', '2026-08-15 12:15:00', NULL, '2026-08-30 14:20:00'),
      (32, 5, 'Linear Maps', 'education', '2026-08-25 10:45:00', NULL, '2026-09-15 13:30:00'),
      (33, 5, 'Matrices', 'education', '2026-09-10 14:00:00', NULL, '2026-09-25 11:45:00'),
      (34, 5, 'Eigenvalues', 'education', '2026-09-20 08:30:00', NULL, '2026-10-10 15:30:00'),
      (35, 5, 'Eigenvectors', 'education', '2026-09-20 11:00:00', NULL, '2026-10-10 17:15:00'),
      (36, 5, 'Diagonalization', 'education', '2026-10-10 13:45:00', NULL, '2026-10-30 10:30:00'),
      (37, 5, 'Inner Product Spaces', 'education', '2026-10-20 09:15:00', NULL, '2026-11-15 14:45:00'),

      -- Differential Equations
      (38, 6, 'First Order Differential Equations', 'education', '2026-11-01 10:30:00', NULL, '2026-11-15 16:20:00'),
      (39, 6, 'Second Order Differential Equations', 'education', '2026-11-10 14:15:00', NULL, '2026-11-25 12:45:00'),
      (40, 6, 'Applications of Differential Equations', 'education', '2026-11-20 11:00:00', NULL, '2026-12-01 15:30:00'),

      -- Abstract Algebra
      (41, 7, 'Groups', 'education', '2026-10-15 09:45:00', NULL, '2026-11-01 13:20:00'),
      (42, 7, 'Cyclic Groups', 'education', '2026-11-01 12:30:00', NULL, '2026-11-15 10:15:00'),
      (43, 7, 'Permutation Groups', 'education', '2026-11-10 15:45:00', NULL, '2026-11-25 14:00:00'),
      (44, 7, 'Homomorphisms', 'education', '2026-11-20 10:00:00', NULL, '2026-12-05 16:30:00'),
      (45, 7, 'Cosets', 'education', '2026-12-01 13:15:00', NULL, '2026-12-15 11:45:00'),

      -- Practice
      (46, 8, 'Previous Year Papers', 'education', '2026-11-15 08:30:00', NULL, '2027-01-15 17:00:00'),
      (47, 8, 'Mock Tests', 'education', '2026-12-01 14:20:00', NULL, '2027-01-15 13:45:00'),
      (48, 8, 'Revision Notes', 'education', '2026-12-01 10:15:00', NULL, '2027-01-10 15:30:00'),
      (49, 8, 'Formula Sheets', 'education', '2026-12-01 16:45:00', NULL, '2027-01-05 12:00:00');
  `);

  // Test Inserts
  await db.execAsync(`
      INSERT INTO goals(title, domain, start_date, completed_at, deadline, status)
  VALUES
    ('Default Goal', 'personal', NULL, NULL, NULL, 'in_progress'),
    ('Morning Workout', 'health', '2026-05-01 06:00:00', '2026-05-01 07:00:00', '2026-06-01 00:00:00', 'in_progress'),

    ('Learn SQL', 'education', '2026-05-02 18:00:00', '2026-05-02 20:00:00', '2026-07-01 00:00:00', 'in_progress'),

    ('Save Emergency Fund', 'finance', '2026-05-03 09:00:00', '2026-05-03 10:00:00', '2026-12-31 00:00:00', 'in_progress'),

    ('Build Portfolio Website', 'career', '2026-05-04 10:00:00', '2026-05-04 13:00:00', '2026-08-01 00:00:00', 'in_progress'),

    ('Read 12 Books', 'personal', '2026-05-05 20:00:00', '2026-05-05 21:00:00', '2026-12-31 00:00:00', 'in_progress'),

    ('Meditation Routine', 'health', '2026-05-06 07:00:00', '2026-05-06 07:30:00', '2026-09-01 00:00:00', 'done'),

    ('Travel with Friends', 'social', '2026-05-07 08:00:00', '2026-05-07 09:00:00', '2026-11-15 00:00:00', 'in_progress'),

    ('Movie Marathon', 'entertainment', '2026-05-08 19:00:00', '2026-05-08 23:00:00', '2026-06-15 00:00:00', 'done'),

    ('Online Certification', 'education', '2026-05-09 15:00:00', '2026-05-09 17:00:00', '2026-10-01 00:00:00', 'in_progress'),

    ('Networking Events', 'career', '2026-05-10 18:00:00', '2026-05-10 20:00:00', '2026-09-30 00:00:00', 'in_progress');
  `);

  await db.execAsync(`
INSERT INTO tasks(
    id,
    title,
    description,
    status,
    start_date,
    deadline,
    completed_at,
    priority,
    is_recurring,
    recurrence_type,
    recurrence_days,
    goal_id
  )
  VALUES
    (
      1,
      'Push-ups',
      'Do 50 push-ups',
      'done',
      '2026-05-01 06:00:00',
      '2026-05-01 07:00:00',
      '2026-06-01 06:45:00',
      1,
      1,
      'weekly',
      '1,2,3,4,5',
      1
    ),
    (
      2,
      'SQL Practice',
      'Complete JOIN exercises',
      'in_progress',
      '2026-05-02 18:00:00',
      '2026-06-10 20:00:00',
      NULL,
      2,
      1,
      'weekly',
      '6,7',
      2
    ),

    (
      3,
      'Deposit Savings',
      'Add money to savings account',
      'todo',
      '2026-05-03 09:00:00',
      '2026-05-15 10:00:00',
      '2026-05-03 09:30:00',
      3,
      0,
      NULL,
      NULL,
      3
    ),

    (
      4,
      'Design Homepage',
      'Create landing page UI',
      'in_progress',
      '2026-05-04 10:00:00',
      '2026-05-20 18:00:00',
      NULL,
      1,
      0,
      NULL,
      NULL,
      4
    ),

    (
      5,
      'Read Atomic Habits',
      'Finish first 5 chapters',
      'done',
      '2026-05-05 20:00:00',
      '2026-05-12 21:00:00',
      '2026-06-02 20:30:00',
      2,
      1,
      'weekly',
      '1,3,5',
      5
    ),

    (
      6,
      'Morning Meditation',
      'Meditate for 15 minutes',
      'done',
      '2026-05-06 07:00:00',
      '2026-05-06 07:30:00',
      NULL,
      3,
      1,
      'daily',
      NULL,
      6
    ),

    (
      7,
      'Book Hotel',
      'Reserve hotel rooms',
      'todo',
      '2026-05-07 08:00:00',
      '2026-08-01 12:00:00',
      NULL,
      1,
      0,
      NULL,
      NULL,
      7
    ),

    (
      8,
      'Watch Sci-Fi Movies',
      'Watch 3 classic sci-fi movies',
      'todo',
      '2026-05-08 19:00:00',
      '2026-05-08 23:00:00',
      NULL,
      2,
      0,
      NULL,
      NULL,
      8
    ),

    (
      9,
      'Complete React Course',
      'Finish module 4',
      'missed',
      '2026-05-09 15:00:00',
      '2026-06-01 18:00:00',
      NULL,
      3,
      1,
      'weekly',
      '2,4',
      9
    ),

    (
      10,
      'Attend Tech Meetup',
      'Meet software professionals',
      'todo',
      '2026-05-10 18:00:00',
      '2026-06-15 20:00:00',
      '2026-06-03 19:00:00',
      1,
      0,
      NULL,
      NULL,
      10
    );
  `);

  await db.execAsync(`
    INSERT INTO task_instances(
    task_id,
    instance_date,
    status
  )
  VALUES
    (1, '2026-06-01', 'done'),
    (1, '2026-06-02', 'todo'),
    (1, '2026-06-03', 'todo'),

    (2, '2026-06-02', 'in_progress'),
    (2, '2026-06-03', 'todo'),

    (3, '2026-06-03', 'done'),
    
    (4, '2026-06-02', 'todo'),
    (4, '2026-06-03', 'todo'),

    (5, '2026-06-02', 'done'),
    (6, '2026-06-02', 'todo'),
    (6, '2026-06-03', 'in_progress'),
    (7, '2026-06-01', 'todo'),
    (7, '2026-06-02', 'in_progress'),
    (8, '2026-06-03', 'todo'),
    (9, '2026-06-02', 'missed'),
    (9, '2026-06-03', 'missed'),
    (10, '2026-06-02', 'missed'),
    (10, '2026-06-03', 'done');
  `);

  await db.execAsync(`
    INSERT INTO avatars(
    name,
    unlock_xp,
    description
  )
  VALUES

    (
      'Sloth',
      14,
      'have sloth of work'
    ),

    (
      'Panda',
      28,
      'Still living in Panda-mic'
    ),

    (
      'Rabbit',
      42,
      'Feeling hoop-less'
    ),

    (
      'Tortoise',
      56,
      'Still have a shell lot to do'
    ),

    (
      'Beaver',
      70,
      'Should Beaver-king'
    ),
    (
      'Owl',
      84,
      'Howl much is left?'
    ),
    (
      'Bee',
      100,
      'Bee-zier Than Ever'
    )
    ;
  `);

  await db.execAsync(`
INSERT INTO users
    (username, email, avatar_id)
  VALUES
    (
      'SAMANTHA JONES',
      'sam@example.com',
      1
    ),
    (
      'PRIYA CHELANI',
      'priya@retarded.com',
      5); `);

  console.log("Database initialized successfully");
}
