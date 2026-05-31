-- Insert 10 goals
INSERT INTO goals (title, category, start_time, end_time, deadline, status)
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


-- Insert 10 tasks
INSERT INTO tasks (
    title,
    description,
    category,
    status,
    start_date,
    deadline,
    completed_at,
    is_recurring,
    recurrence_type,
    recurrence_days,
    group_id
)
VALUES
(
    'Push-ups',
    'Do 50 push-ups',
    'health',
    'done',
    '2026-05-01 06:00:00',
    '2026-05-01 07:00:00',
    '2026-05-01 06:45:00',
    1,
    'daily',
    'Mon,Tue,Wed,Thu,Fri',
    1
),

(
    'SQL Practice',
    'Complete JOIN exercises',
    'education',
    'in_progress',
    '2026-05-02 18:00:00',
    '2026-05-10 20:00:00',
    NULL,
    1,
    'weekly',
    'Sat,Sun',
    2
),

(
    'Deposit Savings',
    'Add money to savings account',
    'finance',
    'todo',
    '2026-05-03 09:00:00',
    '2026-05-15 10:00:00',
    NULL,
    0,
    NULL,
    NULL,
    3
),

(
    'Design Homepage',
    'Create landing page UI',
    'career',
    'in_progress',
    '2026-05-04 10:00:00',
    '2026-05-20 18:00:00',
    NULL,
    0,
    NULL,
    NULL,
    4
),

(
    'Read Atomic Habits',
    'Finish first 5 chapters',
    'personal',
    'done',
    '2026-05-05 20:00:00',
    '2026-05-12 21:00:00',
    '2026-05-11 20:30:00',
    1,
    'daily',
    'Mon,Wed,Fri',
    5
),

(
    'Morning Meditation',
    'Meditate for 15 minutes',
    'health',
    'done',
    '2026-05-06 07:00:00',
    '2026-05-06 07:30:00',
    '2026-05-06 07:20:00',
    1,
    'daily',
    'Everyday',
    6
),

(
    'Book Hotel',
    'Reserve hotel rooms',
    'social',
    'todo',
    '2026-05-07 08:00:00',
    '2026-08-01 12:00:00',
    NULL,
    0,
    NULL,
    NULL,
    7
),

(
    'Watch Sci-Fi Movies',
    'Watch 3 classic sci-fi movies',
    'entertainment',
    'missed',
    '2026-05-08 19:00:00',
    '2026-05-08 23:00:00',
    NULL,
    0,
    NULL,
    NULL,
    8
),

(
    'Complete React Course',
    'Finish module 4',
    'education',
    'in_progress',
    '2026-05-09 15:00:00',
    '2026-06-01 18:00:00',
    NULL,
    1,
    'weekly',
    'Tue,Thu',
    9
),

(
    'Attend Tech Meetup',
    'Meet software professionals',
    'career',
    'todo',
    '2026-05-10 18:00:00',
    '2026-06-15 20:00:00',
    NULL,
    0,
    NULL,
    NULL,
    10
);
