import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("app.db");

export async function initDB() {
  // Goals Table
  await db.execAsync(`
    DROP TABLE IF EXISTS goals;
    CREATE TABLE IF NOT EXISTS goals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    domain TEXT NOT NULL
    CHECK(
      domain IN(
        'personal',
        'career',
        'health',
        'finance',
        'education',
        'entertainment',
        'social'
      )
    ),
    start_time DATETIME,
    end_time DATETIME,
    deadline DATETIME,
    status TEXT NOT NULL DEFAULT 'todo'
    CHECK(
      status IN(
        'todo',
        'in_progress',
        'done'
      )
    )
  );
  `);

  // Tasks Table
  await db.execAsync(`
    DROP TABLE IF EXISTS tasks;    
    CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id INTEGER,

    title TEXT NOT NULL,

    description TEXT,

    domain TEXT,
    
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
    goal_id INTEGER,

    FOREIGN KEY (goal_id)
    REFERENCES goals(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
  );
  `);

  //Users Table

  await db.execAsync(`  
    DROP TABLE IF EXISTS users; 
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT UNIQUE,
        avatar_id INTEGER,
        xp INTEGER NOT NULL DEFAULT 0,
        streak_days INTEGER NOT NULL DEFAULT 0,

    FOREIGN KEY (avatar_id)
        REFERENCES avatars(id)
        ON DELETE SET NULL
);
    `);

  //Avatars Table
  await db.execAsync(`
        DROP TABLE IF EXISTS avatars;
        CREATE TABLE IF NOT EXISTS avatars (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT NOT NULL,
        unlock_xp INTEGER NOT NULL DEFAULT 0
        );
        `);

  // Test Inserts
  await db.execAsync(`
      INSERT INTO goals (title, domain, start_time, end_time, deadline, status)
      VALUES
      ('Morning Workout', 'health', '2026-05-01 06:00:00', '2026-05-01 07:00:00', '2026-06-01 00:00:00', 'in_progress'),

    ('Learn SQL', 'education', '2026-05-02 18:00:00', '2026-05-02 20:00:00', '2026-07-01 00:00:00', 'todo'),

    ('Save Emergency Fund', 'finance', '2026-05-03 09:00:00', '2026-05-03 10:00:00', '2026-12-31 00:00:00', 'in_progress'),

    ('Build Portfolio Website', 'career', '2026-05-04 10:00:00', '2026-05-04 13:00:00', '2026-08-01 00:00:00', 'todo'),

    ('Read 12 Books', 'personal', '2026-05-05 20:00:00', '2026-05-05 21:00:00', '2026-12-31 00:00:00', 'in_progress'),

    ('Meditation Routine', 'health', '2026-05-06 07:00:00', '2026-05-06 07:30:00', '2026-09-01 00:00:00', 'done'),

    ('Travel with Friends', 'social', '2026-05-07 08:00:00', '2026-05-07 09:00:00', '2026-11-15 00:00:00', 'todo'),

    ('Movie Marathon', 'entertainment', '2026-05-08 19:00:00', '2026-05-08 23:00:00', '2026-06-15 00:00:00', 'done'),

    ('Online Certification', 'education', '2026-05-09 15:00:00', '2026-05-09 17:00:00', '2026-10-01 00:00:00', 'in_progress'),

    ('Networking Events', 'career', '2026-05-10 18:00:00', '2026-05-10 20:00:00', '2026-09-30 00:00:00', 'todo');
`);

  await db.execAsync(`
INSERT INTO tasks (
    id,
    task_id,
    title,
    description,
    domain,
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
    1,
    'Push-ups',
    'Do 50 push-ups',
    'health',
    'done',
    '2026-05-01 06:00:00',
    '2026-05-01 07:00:00',
    '2026-05-01 06:45:00',
    1,
    1,
    'daily',
    'Mon,Tue,Wed,Thu,Fri',
    1
),
(
    2,
    2,
    'SQL Practice',
    'Complete JOIN exercises',
    'education',
    'in_progress',
    '2026-05-02 18:00:00',
    '2026-05-10 20:00:00',
    NULL,
    2,
    1,
    'weekly',
    'Sat,Sun',
    2
),

(
    3,
    3,
    'Deposit Savings',
    'Add money to savings account',
    'finance',
    'todo',
    '2026-05-03 09:00:00',
    '2026-05-15 10:00:00',
    NULL,
    3,
    0,
    NULL,
    NULL,
    3
),

(
    4,
    4,
    'Design Homepage',
    'Create landing page UI',
    'career',
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
    5,
    'Read Atomic Habits',
    'Finish first 5 chapters',
    'personal',
    'done',
    '2026-05-05 20:00:00',
    '2026-05-12 21:00:00',
    '2026-05-11 20:30:00',
    2,
    1,
    'daily',
    'Mon,Wed,Fri',
    5
),

(
    6,
    6,
    'Morning Meditation',
    'Meditate for 15 minutes',
    'health',
    'done',
    '2026-05-06 07:00:00',
    '2026-05-06 07:30:00',
    '2026-05-06 07:20:00',
    3,
    1,
    'daily',
    'Everyday',
    6
),

(
    7,
    7,
    'Book Hotel',
    'Reserve hotel rooms',
    'social',
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
    8,
    'Watch Sci-Fi Movies',
    'Watch 3 classic sci-fi movies',
    'entertainment',
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
    9,
    'Complete React Course',
    'Finish module 4',
    'education',
    'missed',
    '2026-05-09 15:00:00',
    '2026-06-01 18:00:00',
    NULL,
    3,
    1,
    'weekly',
    'Tue,Thu',
    9
),

(
    10,
    10,
    'Attend Tech Meetup',
    'Meet software professionals',
    'career',
    'todo',
    '2026-05-10 18:00:00',
    '2026-06-15 20:00:00',
    NULL,
    1,
    0,
    NULL,
    NULL,
    10
);
`);

  await db.execAsync(`
    INSERT INTO avatars (
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
    5);`);

  console.log("Database initialized successfully");
}
