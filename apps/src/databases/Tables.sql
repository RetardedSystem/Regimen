-- Read the Documentation for the database schema.<Insert the Location and name of the Document>

-- Goals Table -- 
CREATE TABLE IF NOT EXISTS goals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    title TEXT NOT NULL,

    category TEXT NOT NULL
    CHECK (
        category IN (
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
    CHECK (
        status IN (
            'todo',
            'in_progress',
            'done'
        )
    )
);

-- Task Table -- 
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    title TEXT NOT NULL,

    description TEXT,

    category TEXT,

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

    -- Recurrence
    is_recurring BOOLEAN NOT NULL DEFAULT 0,

    recurrence_type TEXT DEFAULT NULL
    CHECK (
        recurrence_type IN (
            'daily',
            'weekly',
            'monthly',
            'yearly',
            'custom'
        )
        OR recurrence_type IS NULL
    ),

    recurrence_days TEXT DEFAULT NULL,

    -- Link to Goals table
    group_id INTEGER,

    FOREIGN KEY (group_id)
    REFERENCES goals(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

--User Table--
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT.
        username TEXT NOT NULL,
        email TEXT UNIQUE,
        avatar_id INTEGER,
        xp INTEGER NOT NULL DEFAULT 0,
        streak_days INTEGER NOT NULL DEFAULT 0,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (avatar_id)
        REFERENCES avatars(id)
        ON DELETE SET NULL
    );
--Avatars Table--
        CREATE TABLE IF NOT EXISTS avatars (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT NOT NULL,
        image_uri TEXT NOT NULL,
        unlock_xp INTEGER NOT NULL DEFAULT 0,
        );