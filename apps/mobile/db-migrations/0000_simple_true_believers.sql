CREATE TABLE `data_group_measurements` (
	`id` text,
	`dataGroupId` text,
	`dataGroupUnitId` text,
	`value` integer,
	`createdAt` integer
);
--> statement-breakpoint
CREATE TABLE `data_group_targets` (
	`id` text,
	`dataGroupId` text,
	`dataGroupUnitId` text,
	`name` text,
	`type` text,
	`min` integer,
	`max` integer,
	`targetDate` integer,
	`createdAt` integer
);
--> statement-breakpoint
CREATE TABLE `data_groups_units` (
	`id` text,
	`dataGroupId` text,
	`type` text,
	`unitLabel` text,
	`unitMin` integer,
	`unitMax` integer
);
--> statement-breakpoint
CREATE TABLE `data_groups` (
	`id` text,
	`name` text,
	`description` text,
	`color` text,
	`icon` text
);
--> statement-breakpoint
CREATE TABLE `user_profile` (
	`name` text,
	`signupDate` integer DEFAULT (CURRENT_TIMESTAMP),
	`currentStreakStart` integer,
	`currentStreakEnd` integer,
	`currentStreakDays` integer,
	`longestStreakDays` integer,
	`avatarImage` blob
);
