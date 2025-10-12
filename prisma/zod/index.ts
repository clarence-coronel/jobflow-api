import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','firebaseUid','field','profession','email','name','photoUrl','provider','createdAt','updatedAt']);

export const RequiredSkillScalarFieldEnumSchema = z.enum(['id','name','description','yearsOfExperienceNeeded','yearsOfExperienceHave','jobApplicationId','isOptional','isRequirementMet']);

export const JobApplicationStatusHistoryScalarFieldEnumSchema = z.enum(['id','jobApplicationId','oldStatus','newStatus','changedAt']);

export const ReminderScalarFieldEnumSchema = z.enum(['id','name','jobApplicationId','reminderDate','remindAt','createdAt','updatedAt']);

export const TagScalarFieldEnumSchema = z.enum(['id','name','color','createdAt','updatedAt','userId']);

export const JobApplicationScalarFieldEnumSchema = z.enum(['id','title','company','location','description','status','sourceName','sourceUrl','userId','resumeUrl','createdAt','updatedAt','deletedAt','order']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const JobApplicationStatusSchema = z.enum(['WISHLIST','APPLIED','INTERVIEWING','ACCEPTED','REJECTED','DROPPED']);

export type JobApplicationStatusType = `${z.infer<typeof JobApplicationStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.uuid(),
  firebaseUid: z.string(),
  field: z.string().nullable(),
  profession: z.string().nullable(),
  email: z.string(),
  name: z.string().nullable(),
  photoUrl: z.string().nullable(),
  provider: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// REQUIRED SKILL SCHEMA
/////////////////////////////////////////

export const RequiredSkillSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string().nullable(),
  yearsOfExperienceNeeded: z.number().int().nullable(),
  yearsOfExperienceHave: z.number().int().nullable(),
  jobApplicationId: z.string(),
  isOptional: z.boolean(),
  isRequirementMet: z.boolean(),
})

export type RequiredSkill = z.infer<typeof RequiredSkillSchema>

/////////////////////////////////////////
// JOB APPLICATION STATUS HISTORY SCHEMA
/////////////////////////////////////////

export const JobApplicationStatusHistorySchema = z.object({
  oldStatus: JobApplicationStatusSchema,
  newStatus: JobApplicationStatusSchema,
  id: z.uuid(),
  jobApplicationId: z.string(),
  changedAt: z.coerce.date(),
})

export type JobApplicationStatusHistory = z.infer<typeof JobApplicationStatusHistorySchema>

/////////////////////////////////////////
// REMINDER SCHEMA
/////////////////////////////////////////

export const ReminderSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  jobApplicationId: z.string(),
  reminderDate: z.coerce.date(),
  remindAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Reminder = z.infer<typeof ReminderSchema>

/////////////////////////////////////////
// TAG SCHEMA
/////////////////////////////////////////

export const TagSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  color: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
})

export type Tag = z.infer<typeof TagSchema>

/////////////////////////////////////////
// JOB APPLICATION SCHEMA
/////////////////////////////////////////

export const JobApplicationSchema = z.object({
  status: JobApplicationStatusSchema,
  id: z.uuid(),
  title: z.string(),
  company: z.string(),
  location: z.string().nullable(),
  description: z.string().nullable(),
  sourceName: z.string().nullable(),
  sourceUrl: z.string().nullable(),
  userId: z.string(),
  resumeUrl: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
  order: z.number().int(),
})

export type JobApplication = z.infer<typeof JobApplicationSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  jobApplications: z.union([z.boolean(),z.lazy(() => JobApplicationFindManyArgsSchema)]).optional(),
  availableTags: z.union([z.boolean(),z.lazy(() => TagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  jobApplications: z.boolean().optional(),
  availableTags: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  firebaseUid: z.boolean().optional(),
  field: z.boolean().optional(),
  profession: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  photoUrl: z.boolean().optional(),
  provider: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  jobApplications: z.union([z.boolean(),z.lazy(() => JobApplicationFindManyArgsSchema)]).optional(),
  availableTags: z.union([z.boolean(),z.lazy(() => TagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// REQUIRED SKILL
//------------------------------------------------------

export const RequiredSkillIncludeSchema: z.ZodType<Prisma.RequiredSkillInclude> = z.object({
  jobApplication: z.union([z.boolean(),z.lazy(() => JobApplicationArgsSchema)]).optional(),
}).strict();

export const RequiredSkillArgsSchema: z.ZodType<Prisma.RequiredSkillDefaultArgs> = z.object({
  select: z.lazy(() => RequiredSkillSelectSchema).optional(),
  include: z.lazy(() => RequiredSkillIncludeSchema).optional(),
}).strict();

export const RequiredSkillSelectSchema: z.ZodType<Prisma.RequiredSkillSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  yearsOfExperienceNeeded: z.boolean().optional(),
  yearsOfExperienceHave: z.boolean().optional(),
  jobApplicationId: z.boolean().optional(),
  isOptional: z.boolean().optional(),
  isRequirementMet: z.boolean().optional(),
  jobApplication: z.union([z.boolean(),z.lazy(() => JobApplicationArgsSchema)]).optional(),
}).strict()

// JOB APPLICATION STATUS HISTORY
//------------------------------------------------------

export const JobApplicationStatusHistoryIncludeSchema: z.ZodType<Prisma.JobApplicationStatusHistoryInclude> = z.object({
  jobApplication: z.union([z.boolean(),z.lazy(() => JobApplicationArgsSchema)]).optional(),
}).strict();

export const JobApplicationStatusHistoryArgsSchema: z.ZodType<Prisma.JobApplicationStatusHistoryDefaultArgs> = z.object({
  select: z.lazy(() => JobApplicationStatusHistorySelectSchema).optional(),
  include: z.lazy(() => JobApplicationStatusHistoryIncludeSchema).optional(),
}).strict();

export const JobApplicationStatusHistorySelectSchema: z.ZodType<Prisma.JobApplicationStatusHistorySelect> = z.object({
  id: z.boolean().optional(),
  jobApplicationId: z.boolean().optional(),
  oldStatus: z.boolean().optional(),
  newStatus: z.boolean().optional(),
  changedAt: z.boolean().optional(),
  jobApplication: z.union([z.boolean(),z.lazy(() => JobApplicationArgsSchema)]).optional(),
}).strict()

// REMINDER
//------------------------------------------------------

export const ReminderIncludeSchema: z.ZodType<Prisma.ReminderInclude> = z.object({
  jobApplication: z.union([z.boolean(),z.lazy(() => JobApplicationArgsSchema)]).optional(),
}).strict();

export const ReminderArgsSchema: z.ZodType<Prisma.ReminderDefaultArgs> = z.object({
  select: z.lazy(() => ReminderSelectSchema).optional(),
  include: z.lazy(() => ReminderIncludeSchema).optional(),
}).strict();

export const ReminderSelectSchema: z.ZodType<Prisma.ReminderSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  jobApplicationId: z.boolean().optional(),
  reminderDate: z.boolean().optional(),
  remindAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  jobApplication: z.union([z.boolean(),z.lazy(() => JobApplicationArgsSchema)]).optional(),
}).strict()

// TAG
//------------------------------------------------------

export const TagIncludeSchema: z.ZodType<Prisma.TagInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  jobApplications: z.union([z.boolean(),z.lazy(() => JobApplicationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const TagArgsSchema: z.ZodType<Prisma.TagDefaultArgs> = z.object({
  select: z.lazy(() => TagSelectSchema).optional(),
  include: z.lazy(() => TagIncludeSchema).optional(),
}).strict();

export const TagCountOutputTypeArgsSchema: z.ZodType<Prisma.TagCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TagCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TagCountOutputTypeSelectSchema: z.ZodType<Prisma.TagCountOutputTypeSelect> = z.object({
  jobApplications: z.boolean().optional(),
}).strict();

export const TagSelectSchema: z.ZodType<Prisma.TagSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  color: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  jobApplications: z.union([z.boolean(),z.lazy(() => JobApplicationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
}).strict()

// JOB APPLICATION
//------------------------------------------------------

export const JobApplicationIncludeSchema: z.ZodType<Prisma.JobApplicationInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  requiredSkill: z.union([z.boolean(),z.lazy(() => RequiredSkillFindManyArgsSchema)]).optional(),
  jobApplicationStatusHistory: z.union([z.boolean(),z.lazy(() => JobApplicationStatusHistoryFindManyArgsSchema)]).optional(),
  reminders: z.union([z.boolean(),z.lazy(() => ReminderFindManyArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => TagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => JobApplicationCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const JobApplicationArgsSchema: z.ZodType<Prisma.JobApplicationDefaultArgs> = z.object({
  select: z.lazy(() => JobApplicationSelectSchema).optional(),
  include: z.lazy(() => JobApplicationIncludeSchema).optional(),
}).strict();

export const JobApplicationCountOutputTypeArgsSchema: z.ZodType<Prisma.JobApplicationCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => JobApplicationCountOutputTypeSelectSchema).nullish(),
}).strict();

export const JobApplicationCountOutputTypeSelectSchema: z.ZodType<Prisma.JobApplicationCountOutputTypeSelect> = z.object({
  requiredSkill: z.boolean().optional(),
  jobApplicationStatusHistory: z.boolean().optional(),
  reminders: z.boolean().optional(),
  tags: z.boolean().optional(),
}).strict();

export const JobApplicationSelectSchema: z.ZodType<Prisma.JobApplicationSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  company: z.boolean().optional(),
  location: z.boolean().optional(),
  description: z.boolean().optional(),
  status: z.boolean().optional(),
  sourceName: z.boolean().optional(),
  sourceUrl: z.boolean().optional(),
  userId: z.boolean().optional(),
  resumeUrl: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  deletedAt: z.boolean().optional(),
  order: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  requiredSkill: z.union([z.boolean(),z.lazy(() => RequiredSkillFindManyArgsSchema)]).optional(),
  jobApplicationStatusHistory: z.union([z.boolean(),z.lazy(() => JobApplicationStatusHistoryFindManyArgsSchema)]).optional(),
  reminders: z.union([z.boolean(),z.lazy(() => ReminderFindManyArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => TagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => JobApplicationCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  firebaseUid: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  field: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  profession: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  photoUrl: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  provider: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  jobApplications: z.lazy(() => JobApplicationListRelationFilterSchema).optional(),
  availableTags: z.lazy(() => TagListRelationFilterSchema).optional(),
});

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  firebaseUid: z.lazy(() => SortOrderSchema).optional(),
  field: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  profession: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  photoUrl: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  jobApplications: z.lazy(() => JobApplicationOrderByRelationAggregateInputSchema).optional(),
  availableTags: z.lazy(() => TagOrderByRelationAggregateInputSchema).optional(),
});

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    firebaseUid: z.string(),
    email: z.string(),
  }),
  z.object({
    id: z.uuid(),
    firebaseUid: z.string(),
  }),
  z.object({
    id: z.uuid(),
    email: z.string(),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    firebaseUid: z.string(),
    email: z.string(),
  }),
  z.object({
    firebaseUid: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  firebaseUid: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  field: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  profession: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  photoUrl: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  provider: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  jobApplications: z.lazy(() => JobApplicationListRelationFilterSchema).optional(),
  availableTags: z.lazy(() => TagListRelationFilterSchema).optional(),
}));

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  firebaseUid: z.lazy(() => SortOrderSchema).optional(),
  field: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  profession: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  photoUrl: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
});

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  firebaseUid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  field: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  profession: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  photoUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const RequiredSkillWhereInputSchema: z.ZodType<Prisma.RequiredSkillWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => RequiredSkillWhereInputSchema), z.lazy(() => RequiredSkillWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RequiredSkillWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RequiredSkillWhereInputSchema), z.lazy(() => RequiredSkillWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  yearsOfExperienceNeeded: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  yearsOfExperienceHave: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  jobApplicationId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  isOptional: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  isRequirementMet: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  jobApplication: z.union([ z.lazy(() => JobApplicationScalarRelationFilterSchema), z.lazy(() => JobApplicationWhereInputSchema) ]).optional(),
});

export const RequiredSkillOrderByWithRelationInputSchema: z.ZodType<Prisma.RequiredSkillOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  yearsOfExperienceNeeded: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  yearsOfExperienceHave: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  jobApplicationId: z.lazy(() => SortOrderSchema).optional(),
  isOptional: z.lazy(() => SortOrderSchema).optional(),
  isRequirementMet: z.lazy(() => SortOrderSchema).optional(),
  jobApplication: z.lazy(() => JobApplicationOrderByWithRelationInputSchema).optional(),
});

export const RequiredSkillWhereUniqueInputSchema: z.ZodType<Prisma.RequiredSkillWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    jobApplicationId: z.string(),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    jobApplicationId: z.string(),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  jobApplicationId: z.string().optional(),
  AND: z.union([ z.lazy(() => RequiredSkillWhereInputSchema), z.lazy(() => RequiredSkillWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RequiredSkillWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RequiredSkillWhereInputSchema), z.lazy(() => RequiredSkillWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  yearsOfExperienceNeeded: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  yearsOfExperienceHave: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  isOptional: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  isRequirementMet: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  jobApplication: z.union([ z.lazy(() => JobApplicationScalarRelationFilterSchema), z.lazy(() => JobApplicationWhereInputSchema) ]).optional(),
}));

export const RequiredSkillOrderByWithAggregationInputSchema: z.ZodType<Prisma.RequiredSkillOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  yearsOfExperienceNeeded: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  yearsOfExperienceHave: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  jobApplicationId: z.lazy(() => SortOrderSchema).optional(),
  isOptional: z.lazy(() => SortOrderSchema).optional(),
  isRequirementMet: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RequiredSkillCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RequiredSkillAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RequiredSkillMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RequiredSkillMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RequiredSkillSumOrderByAggregateInputSchema).optional(),
});

export const RequiredSkillScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RequiredSkillScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => RequiredSkillScalarWhereWithAggregatesInputSchema), z.lazy(() => RequiredSkillScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RequiredSkillScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RequiredSkillScalarWhereWithAggregatesInputSchema), z.lazy(() => RequiredSkillScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  yearsOfExperienceNeeded: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  yearsOfExperienceHave: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  jobApplicationId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  isOptional: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  isRequirementMet: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
});

export const JobApplicationStatusHistoryWhereInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => JobApplicationStatusHistoryWhereInputSchema), z.lazy(() => JobApplicationStatusHistoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobApplicationStatusHistoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobApplicationStatusHistoryWhereInputSchema), z.lazy(() => JobApplicationStatusHistoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  jobApplicationId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  oldStatus: z.union([ z.lazy(() => EnumJobApplicationStatusFilterSchema), z.lazy(() => JobApplicationStatusSchema) ]).optional(),
  newStatus: z.union([ z.lazy(() => EnumJobApplicationStatusFilterSchema), z.lazy(() => JobApplicationStatusSchema) ]).optional(),
  changedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  jobApplication: z.union([ z.lazy(() => JobApplicationScalarRelationFilterSchema), z.lazy(() => JobApplicationWhereInputSchema) ]).optional(),
});

export const JobApplicationStatusHistoryOrderByWithRelationInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  jobApplicationId: z.lazy(() => SortOrderSchema).optional(),
  oldStatus: z.lazy(() => SortOrderSchema).optional(),
  newStatus: z.lazy(() => SortOrderSchema).optional(),
  changedAt: z.lazy(() => SortOrderSchema).optional(),
  jobApplication: z.lazy(() => JobApplicationOrderByWithRelationInputSchema).optional(),
});

export const JobApplicationStatusHistoryWhereUniqueInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryWhereUniqueInput> = z.object({
  id: z.uuid(),
})
.and(z.strictObject({
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => JobApplicationStatusHistoryWhereInputSchema), z.lazy(() => JobApplicationStatusHistoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobApplicationStatusHistoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobApplicationStatusHistoryWhereInputSchema), z.lazy(() => JobApplicationStatusHistoryWhereInputSchema).array() ]).optional(),
  jobApplicationId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  oldStatus: z.union([ z.lazy(() => EnumJobApplicationStatusFilterSchema), z.lazy(() => JobApplicationStatusSchema) ]).optional(),
  newStatus: z.union([ z.lazy(() => EnumJobApplicationStatusFilterSchema), z.lazy(() => JobApplicationStatusSchema) ]).optional(),
  changedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  jobApplication: z.union([ z.lazy(() => JobApplicationScalarRelationFilterSchema), z.lazy(() => JobApplicationWhereInputSchema) ]).optional(),
}));

export const JobApplicationStatusHistoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  jobApplicationId: z.lazy(() => SortOrderSchema).optional(),
  oldStatus: z.lazy(() => SortOrderSchema).optional(),
  newStatus: z.lazy(() => SortOrderSchema).optional(),
  changedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => JobApplicationStatusHistoryCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => JobApplicationStatusHistoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => JobApplicationStatusHistoryMinOrderByAggregateInputSchema).optional(),
});

export const JobApplicationStatusHistoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => JobApplicationStatusHistoryScalarWhereWithAggregatesInputSchema), z.lazy(() => JobApplicationStatusHistoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobApplicationStatusHistoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobApplicationStatusHistoryScalarWhereWithAggregatesInputSchema), z.lazy(() => JobApplicationStatusHistoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  jobApplicationId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  oldStatus: z.union([ z.lazy(() => EnumJobApplicationStatusWithAggregatesFilterSchema), z.lazy(() => JobApplicationStatusSchema) ]).optional(),
  newStatus: z.union([ z.lazy(() => EnumJobApplicationStatusWithAggregatesFilterSchema), z.lazy(() => JobApplicationStatusSchema) ]).optional(),
  changedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const ReminderWhereInputSchema: z.ZodType<Prisma.ReminderWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ReminderWhereInputSchema), z.lazy(() => ReminderWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReminderWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReminderWhereInputSchema), z.lazy(() => ReminderWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  jobApplicationId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  reminderDate: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  remindAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  jobApplication: z.union([ z.lazy(() => JobApplicationScalarRelationFilterSchema), z.lazy(() => JobApplicationWhereInputSchema) ]).optional(),
});

export const ReminderOrderByWithRelationInputSchema: z.ZodType<Prisma.ReminderOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  jobApplicationId: z.lazy(() => SortOrderSchema).optional(),
  reminderDate: z.lazy(() => SortOrderSchema).optional(),
  remindAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  jobApplication: z.lazy(() => JobApplicationOrderByWithRelationInputSchema).optional(),
});

export const ReminderWhereUniqueInputSchema: z.ZodType<Prisma.ReminderWhereUniqueInput> = z.object({
  id: z.uuid(),
})
.and(z.strictObject({
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => ReminderWhereInputSchema), z.lazy(() => ReminderWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReminderWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReminderWhereInputSchema), z.lazy(() => ReminderWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  jobApplicationId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  reminderDate: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  remindAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  jobApplication: z.union([ z.lazy(() => JobApplicationScalarRelationFilterSchema), z.lazy(() => JobApplicationWhereInputSchema) ]).optional(),
}));

export const ReminderOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReminderOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  jobApplicationId: z.lazy(() => SortOrderSchema).optional(),
  reminderDate: z.lazy(() => SortOrderSchema).optional(),
  remindAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ReminderCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ReminderMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ReminderMinOrderByAggregateInputSchema).optional(),
});

export const ReminderScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReminderScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ReminderScalarWhereWithAggregatesInputSchema), z.lazy(() => ReminderScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReminderScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReminderScalarWhereWithAggregatesInputSchema), z.lazy(() => ReminderScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  jobApplicationId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  reminderDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  remindAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const TagWhereInputSchema: z.ZodType<Prisma.TagWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => TagWhereInputSchema), z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema), z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  color: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  jobApplications: z.lazy(() => JobApplicationListRelationFilterSchema).optional(),
});

export const TagOrderByWithRelationInputSchema: z.ZodType<Prisma.TagOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  jobApplications: z.lazy(() => JobApplicationOrderByRelationAggregateInputSchema).optional(),
});

export const TagWhereUniqueInputSchema: z.ZodType<Prisma.TagWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    name: z.string(),
    userId_name: z.lazy(() => TagUserIdNameCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.uuid(),
    name: z.string(),
  }),
  z.object({
    id: z.uuid(),
    userId_name: z.lazy(() => TagUserIdNameCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    name: z.string(),
    userId_name: z.lazy(() => TagUserIdNameCompoundUniqueInputSchema),
  }),
  z.object({
    name: z.string(),
  }),
  z.object({
    userId_name: z.lazy(() => TagUserIdNameCompoundUniqueInputSchema),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  name: z.string().optional(),
  userId_name: z.lazy(() => TagUserIdNameCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => TagWhereInputSchema), z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema), z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  color: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  jobApplications: z.lazy(() => JobApplicationListRelationFilterSchema).optional(),
}));

export const TagOrderByWithAggregationInputSchema: z.ZodType<Prisma.TagOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TagCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TagMinOrderByAggregateInputSchema).optional(),
});

export const TagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TagScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema), z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema), z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  color: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const JobApplicationWhereInputSchema: z.ZodType<Prisma.JobApplicationWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => JobApplicationWhereInputSchema), z.lazy(() => JobApplicationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobApplicationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobApplicationWhereInputSchema), z.lazy(() => JobApplicationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  company: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  location: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumJobApplicationStatusFilterSchema), z.lazy(() => JobApplicationStatusSchema) ]).optional(),
  sourceName: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  sourceUrl: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  resumeUrl: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  order: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  requiredSkill: z.lazy(() => RequiredSkillListRelationFilterSchema).optional(),
  jobApplicationStatusHistory: z.lazy(() => JobApplicationStatusHistoryListRelationFilterSchema).optional(),
  reminders: z.lazy(() => ReminderListRelationFilterSchema).optional(),
  tags: z.lazy(() => TagListRelationFilterSchema).optional(),
});

export const JobApplicationOrderByWithRelationInputSchema: z.ZodType<Prisma.JobApplicationOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  company: z.lazy(() => SortOrderSchema).optional(),
  location: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  sourceName: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  sourceUrl: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  resumeUrl: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  requiredSkill: z.lazy(() => RequiredSkillOrderByRelationAggregateInputSchema).optional(),
  jobApplicationStatusHistory: z.lazy(() => JobApplicationStatusHistoryOrderByRelationAggregateInputSchema).optional(),
  reminders: z.lazy(() => ReminderOrderByRelationAggregateInputSchema).optional(),
  tags: z.lazy(() => TagOrderByRelationAggregateInputSchema).optional(),
});

export const JobApplicationWhereUniqueInputSchema: z.ZodType<Prisma.JobApplicationWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    userId_status_order: z.lazy(() => JobApplicationUserIdStatusOrderCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    userId_status_order: z.lazy(() => JobApplicationUserIdStatusOrderCompoundUniqueInputSchema),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  userId_status_order: z.lazy(() => JobApplicationUserIdStatusOrderCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => JobApplicationWhereInputSchema), z.lazy(() => JobApplicationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobApplicationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobApplicationWhereInputSchema), z.lazy(() => JobApplicationWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  company: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  location: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumJobApplicationStatusFilterSchema), z.lazy(() => JobApplicationStatusSchema) ]).optional(),
  sourceName: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  sourceUrl: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  resumeUrl: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  order: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  requiredSkill: z.lazy(() => RequiredSkillListRelationFilterSchema).optional(),
  jobApplicationStatusHistory: z.lazy(() => JobApplicationStatusHistoryListRelationFilterSchema).optional(),
  reminders: z.lazy(() => ReminderListRelationFilterSchema).optional(),
  tags: z.lazy(() => TagListRelationFilterSchema).optional(),
}));

export const JobApplicationOrderByWithAggregationInputSchema: z.ZodType<Prisma.JobApplicationOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  company: z.lazy(() => SortOrderSchema).optional(),
  location: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  sourceName: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  sourceUrl: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  resumeUrl: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => JobApplicationCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => JobApplicationAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => JobApplicationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => JobApplicationMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => JobApplicationSumOrderByAggregateInputSchema).optional(),
});

export const JobApplicationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.JobApplicationScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => JobApplicationScalarWhereWithAggregatesInputSchema), z.lazy(() => JobApplicationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobApplicationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobApplicationScalarWhereWithAggregatesInputSchema), z.lazy(() => JobApplicationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  company: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  location: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumJobApplicationStatusWithAggregatesFilterSchema), z.lazy(() => JobApplicationStatusSchema) ]).optional(),
  sourceName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  sourceUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  resumeUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  order: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
});

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  firebaseUid: z.string(),
  field: z.string().optional().nullable(),
  profession: z.string().optional().nullable(),
  email: z.string(),
  name: z.string().optional().nullable(),
  photoUrl: z.string().optional().nullable(),
  provider: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  jobApplications: z.lazy(() => JobApplicationCreateNestedManyWithoutUserInputSchema).optional(),
  availableTags: z.lazy(() => TagCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  firebaseUid: z.string(),
  field: z.string().optional().nullable(),
  profession: z.string().optional().nullable(),
  email: z.string(),
  name: z.string().optional().nullable(),
  photoUrl: z.string().optional().nullable(),
  provider: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  jobApplications: z.lazy(() => JobApplicationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  availableTags: z.lazy(() => TagUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firebaseUid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  field: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profession: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  jobApplications: z.lazy(() => JobApplicationUpdateManyWithoutUserNestedInputSchema).optional(),
  availableTags: z.lazy(() => TagUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firebaseUid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  field: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profession: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  jobApplications: z.lazy(() => JobApplicationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  availableTags: z.lazy(() => TagUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  firebaseUid: z.string(),
  field: z.string().optional().nullable(),
  profession: z.string().optional().nullable(),
  email: z.string(),
  name: z.string().optional().nullable(),
  photoUrl: z.string().optional().nullable(),
  provider: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firebaseUid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  field: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profession: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firebaseUid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  field: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profession: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const RequiredSkillCreateInputSchema: z.ZodType<Prisma.RequiredSkillCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  yearsOfExperienceNeeded: z.number().int().optional().nullable(),
  yearsOfExperienceHave: z.number().int().optional().nullable(),
  isOptional: z.boolean().optional(),
  isRequirementMet: z.boolean().optional(),
  jobApplication: z.lazy(() => JobApplicationCreateNestedOneWithoutRequiredSkillInputSchema),
});

export const RequiredSkillUncheckedCreateInputSchema: z.ZodType<Prisma.RequiredSkillUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  yearsOfExperienceNeeded: z.number().int().optional().nullable(),
  yearsOfExperienceHave: z.number().int().optional().nullable(),
  jobApplicationId: z.string(),
  isOptional: z.boolean().optional(),
  isRequirementMet: z.boolean().optional(),
});

export const RequiredSkillUpdateInputSchema: z.ZodType<Prisma.RequiredSkillUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  yearsOfExperienceNeeded: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  yearsOfExperienceHave: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isOptional: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isRequirementMet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  jobApplication: z.lazy(() => JobApplicationUpdateOneRequiredWithoutRequiredSkillNestedInputSchema).optional(),
});

export const RequiredSkillUncheckedUpdateInputSchema: z.ZodType<Prisma.RequiredSkillUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  yearsOfExperienceNeeded: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  yearsOfExperienceHave: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  jobApplicationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOptional: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isRequirementMet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const RequiredSkillCreateManyInputSchema: z.ZodType<Prisma.RequiredSkillCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  yearsOfExperienceNeeded: z.number().int().optional().nullable(),
  yearsOfExperienceHave: z.number().int().optional().nullable(),
  jobApplicationId: z.string(),
  isOptional: z.boolean().optional(),
  isRequirementMet: z.boolean().optional(),
});

export const RequiredSkillUpdateManyMutationInputSchema: z.ZodType<Prisma.RequiredSkillUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  yearsOfExperienceNeeded: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  yearsOfExperienceHave: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isOptional: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isRequirementMet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const RequiredSkillUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RequiredSkillUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  yearsOfExperienceNeeded: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  yearsOfExperienceHave: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  jobApplicationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOptional: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isRequirementMet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const JobApplicationStatusHistoryCreateInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  oldStatus: z.lazy(() => JobApplicationStatusSchema),
  newStatus: z.lazy(() => JobApplicationStatusSchema),
  changedAt: z.coerce.date().optional(),
  jobApplication: z.lazy(() => JobApplicationCreateNestedOneWithoutJobApplicationStatusHistoryInputSchema),
});

export const JobApplicationStatusHistoryUncheckedCreateInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  jobApplicationId: z.string(),
  oldStatus: z.lazy(() => JobApplicationStatusSchema),
  newStatus: z.lazy(() => JobApplicationStatusSchema),
  changedAt: z.coerce.date().optional(),
});

export const JobApplicationStatusHistoryUpdateInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  oldStatus: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  newStatus: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  changedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  jobApplication: z.lazy(() => JobApplicationUpdateOneRequiredWithoutJobApplicationStatusHistoryNestedInputSchema).optional(),
});

export const JobApplicationStatusHistoryUncheckedUpdateInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobApplicationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  oldStatus: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  newStatus: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  changedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const JobApplicationStatusHistoryCreateManyInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  jobApplicationId: z.string(),
  oldStatus: z.lazy(() => JobApplicationStatusSchema),
  newStatus: z.lazy(() => JobApplicationStatusSchema),
  changedAt: z.coerce.date().optional(),
});

export const JobApplicationStatusHistoryUpdateManyMutationInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  oldStatus: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  newStatus: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  changedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const JobApplicationStatusHistoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobApplicationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  oldStatus: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  newStatus: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  changedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ReminderCreateInputSchema: z.ZodType<Prisma.ReminderCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  reminderDate: z.coerce.date(),
  remindAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  jobApplication: z.lazy(() => JobApplicationCreateNestedOneWithoutRemindersInputSchema),
});

export const ReminderUncheckedCreateInputSchema: z.ZodType<Prisma.ReminderUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  jobApplicationId: z.string(),
  reminderDate: z.coerce.date(),
  remindAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const ReminderUpdateInputSchema: z.ZodType<Prisma.ReminderUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reminderDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  remindAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  jobApplication: z.lazy(() => JobApplicationUpdateOneRequiredWithoutRemindersNestedInputSchema).optional(),
});

export const ReminderUncheckedUpdateInputSchema: z.ZodType<Prisma.ReminderUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobApplicationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reminderDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  remindAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ReminderCreateManyInputSchema: z.ZodType<Prisma.ReminderCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  jobApplicationId: z.string(),
  reminderDate: z.coerce.date(),
  remindAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const ReminderUpdateManyMutationInputSchema: z.ZodType<Prisma.ReminderUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reminderDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  remindAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ReminderUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReminderUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobApplicationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reminderDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  remindAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TagCreateInputSchema: z.ZodType<Prisma.TagCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  color: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAvailableTagsInputSchema),
  jobApplications: z.lazy(() => JobApplicationCreateNestedManyWithoutTagsInputSchema).optional(),
});

export const TagUncheckedCreateInputSchema: z.ZodType<Prisma.TagUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  color: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  jobApplications: z.lazy(() => JobApplicationUncheckedCreateNestedManyWithoutTagsInputSchema).optional(),
});

export const TagUpdateInputSchema: z.ZodType<Prisma.TagUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAvailableTagsNestedInputSchema).optional(),
  jobApplications: z.lazy(() => JobApplicationUpdateManyWithoutTagsNestedInputSchema).optional(),
});

export const TagUncheckedUpdateInputSchema: z.ZodType<Prisma.TagUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobApplications: z.lazy(() => JobApplicationUncheckedUpdateManyWithoutTagsNestedInputSchema).optional(),
});

export const TagCreateManyInputSchema: z.ZodType<Prisma.TagCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  color: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
});

export const TagUpdateManyMutationInputSchema: z.ZodType<Prisma.TagUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const JobApplicationCreateInputSchema: z.ZodType<Prisma.JobApplicationCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  company: z.string(),
  location: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => JobApplicationStatusSchema).optional(),
  sourceName: z.string().optional().nullable(),
  sourceUrl: z.string().optional().nullable(),
  resumeUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  order: z.number().int().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutJobApplicationsInputSchema),
  requiredSkill: z.lazy(() => RequiredSkillCreateNestedManyWithoutJobApplicationInputSchema).optional(),
  jobApplicationStatusHistory: z.lazy(() => JobApplicationStatusHistoryCreateNestedManyWithoutJobApplicationInputSchema).optional(),
  reminders: z.lazy(() => ReminderCreateNestedManyWithoutJobApplicationInputSchema).optional(),
  tags: z.lazy(() => TagCreateNestedManyWithoutJobApplicationsInputSchema).optional(),
});

export const JobApplicationUncheckedCreateInputSchema: z.ZodType<Prisma.JobApplicationUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  company: z.string(),
  location: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => JobApplicationStatusSchema).optional(),
  sourceName: z.string().optional().nullable(),
  sourceUrl: z.string().optional().nullable(),
  userId: z.string(),
  resumeUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  order: z.number().int().optional(),
  requiredSkill: z.lazy(() => RequiredSkillUncheckedCreateNestedManyWithoutJobApplicationInputSchema).optional(),
  jobApplicationStatusHistory: z.lazy(() => JobApplicationStatusHistoryUncheckedCreateNestedManyWithoutJobApplicationInputSchema).optional(),
  reminders: z.lazy(() => ReminderUncheckedCreateNestedManyWithoutJobApplicationInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutJobApplicationsInputSchema).optional(),
});

export const JobApplicationUpdateInputSchema: z.ZodType<Prisma.JobApplicationUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  sourceName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sourceUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  resumeUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutJobApplicationsNestedInputSchema).optional(),
  requiredSkill: z.lazy(() => RequiredSkillUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
  jobApplicationStatusHistory: z.lazy(() => JobApplicationStatusHistoryUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
  reminders: z.lazy(() => ReminderUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
  tags: z.lazy(() => TagUpdateManyWithoutJobApplicationsNestedInputSchema).optional(),
});

export const JobApplicationUncheckedUpdateInputSchema: z.ZodType<Prisma.JobApplicationUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  sourceName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sourceUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resumeUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  requiredSkill: z.lazy(() => RequiredSkillUncheckedUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
  jobApplicationStatusHistory: z.lazy(() => JobApplicationStatusHistoryUncheckedUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
  reminders: z.lazy(() => ReminderUncheckedUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedUpdateManyWithoutJobApplicationsNestedInputSchema).optional(),
});

export const JobApplicationCreateManyInputSchema: z.ZodType<Prisma.JobApplicationCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  company: z.string(),
  location: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => JobApplicationStatusSchema).optional(),
  sourceName: z.string().optional().nullable(),
  sourceUrl: z.string().optional().nullable(),
  userId: z.string(),
  resumeUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  order: z.number().int().optional(),
});

export const JobApplicationUpdateManyMutationInputSchema: z.ZodType<Prisma.JobApplicationUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  sourceName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sourceUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  resumeUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const JobApplicationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.JobApplicationUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  sourceName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sourceUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resumeUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const JobApplicationListRelationFilterSchema: z.ZodType<Prisma.JobApplicationListRelationFilter> = z.strictObject({
  every: z.lazy(() => JobApplicationWhereInputSchema).optional(),
  some: z.lazy(() => JobApplicationWhereInputSchema).optional(),
  none: z.lazy(() => JobApplicationWhereInputSchema).optional(),
});

export const TagListRelationFilterSchema: z.ZodType<Prisma.TagListRelationFilter> = z.strictObject({
  every: z.lazy(() => TagWhereInputSchema).optional(),
  some: z.lazy(() => TagWhereInputSchema).optional(),
  none: z.lazy(() => TagWhereInputSchema).optional(),
});

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.strictObject({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional(),
});

export const JobApplicationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.JobApplicationOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const TagOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TagOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  firebaseUid: z.lazy(() => SortOrderSchema).optional(),
  field: z.lazy(() => SortOrderSchema).optional(),
  profession: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  photoUrl: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  firebaseUid: z.lazy(() => SortOrderSchema).optional(),
  field: z.lazy(() => SortOrderSchema).optional(),
  profession: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  photoUrl: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  firebaseUid: z.lazy(() => SortOrderSchema).optional(),
  field: z.lazy(() => SortOrderSchema).optional(),
  profession: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  photoUrl: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
});

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
});

export const JobApplicationScalarRelationFilterSchema: z.ZodType<Prisma.JobApplicationScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => JobApplicationWhereInputSchema).optional(),
  isNot: z.lazy(() => JobApplicationWhereInputSchema).optional(),
});

export const RequiredSkillCountOrderByAggregateInputSchema: z.ZodType<Prisma.RequiredSkillCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  yearsOfExperienceNeeded: z.lazy(() => SortOrderSchema).optional(),
  yearsOfExperienceHave: z.lazy(() => SortOrderSchema).optional(),
  jobApplicationId: z.lazy(() => SortOrderSchema).optional(),
  isOptional: z.lazy(() => SortOrderSchema).optional(),
  isRequirementMet: z.lazy(() => SortOrderSchema).optional(),
});

export const RequiredSkillAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RequiredSkillAvgOrderByAggregateInput> = z.strictObject({
  yearsOfExperienceNeeded: z.lazy(() => SortOrderSchema).optional(),
  yearsOfExperienceHave: z.lazy(() => SortOrderSchema).optional(),
});

export const RequiredSkillMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RequiredSkillMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  yearsOfExperienceNeeded: z.lazy(() => SortOrderSchema).optional(),
  yearsOfExperienceHave: z.lazy(() => SortOrderSchema).optional(),
  jobApplicationId: z.lazy(() => SortOrderSchema).optional(),
  isOptional: z.lazy(() => SortOrderSchema).optional(),
  isRequirementMet: z.lazy(() => SortOrderSchema).optional(),
});

export const RequiredSkillMinOrderByAggregateInputSchema: z.ZodType<Prisma.RequiredSkillMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  yearsOfExperienceNeeded: z.lazy(() => SortOrderSchema).optional(),
  yearsOfExperienceHave: z.lazy(() => SortOrderSchema).optional(),
  jobApplicationId: z.lazy(() => SortOrderSchema).optional(),
  isOptional: z.lazy(() => SortOrderSchema).optional(),
  isRequirementMet: z.lazy(() => SortOrderSchema).optional(),
});

export const RequiredSkillSumOrderByAggregateInputSchema: z.ZodType<Prisma.RequiredSkillSumOrderByAggregateInput> = z.strictObject({
  yearsOfExperienceNeeded: z.lazy(() => SortOrderSchema).optional(),
  yearsOfExperienceHave: z.lazy(() => SortOrderSchema).optional(),
});

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
});

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
});

export const EnumJobApplicationStatusFilterSchema: z.ZodType<Prisma.EnumJobApplicationStatusFilter> = z.strictObject({
  equals: z.lazy(() => JobApplicationStatusSchema).optional(),
  in: z.lazy(() => JobApplicationStatusSchema).array().optional(),
  notIn: z.lazy(() => JobApplicationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => NestedEnumJobApplicationStatusFilterSchema) ]).optional(),
});

export const JobApplicationStatusHistoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  jobApplicationId: z.lazy(() => SortOrderSchema).optional(),
  oldStatus: z.lazy(() => SortOrderSchema).optional(),
  newStatus: z.lazy(() => SortOrderSchema).optional(),
  changedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const JobApplicationStatusHistoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  jobApplicationId: z.lazy(() => SortOrderSchema).optional(),
  oldStatus: z.lazy(() => SortOrderSchema).optional(),
  newStatus: z.lazy(() => SortOrderSchema).optional(),
  changedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const JobApplicationStatusHistoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  jobApplicationId: z.lazy(() => SortOrderSchema).optional(),
  oldStatus: z.lazy(() => SortOrderSchema).optional(),
  newStatus: z.lazy(() => SortOrderSchema).optional(),
  changedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumJobApplicationStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumJobApplicationStatusWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => JobApplicationStatusSchema).optional(),
  in: z.lazy(() => JobApplicationStatusSchema).array().optional(),
  notIn: z.lazy(() => JobApplicationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => NestedEnumJobApplicationStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumJobApplicationStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumJobApplicationStatusFilterSchema).optional(),
});

export const ReminderCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReminderCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  jobApplicationId: z.lazy(() => SortOrderSchema).optional(),
  reminderDate: z.lazy(() => SortOrderSchema).optional(),
  remindAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const ReminderMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReminderMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  jobApplicationId: z.lazy(() => SortOrderSchema).optional(),
  reminderDate: z.lazy(() => SortOrderSchema).optional(),
  remindAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const ReminderMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReminderMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  jobApplicationId: z.lazy(() => SortOrderSchema).optional(),
  reminderDate: z.lazy(() => SortOrderSchema).optional(),
  remindAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional(),
});

export const TagUserIdNameCompoundUniqueInputSchema: z.ZodType<Prisma.TagUserIdNameCompoundUniqueInput> = z.strictObject({
  userId: z.string(),
  name: z.string(),
});

export const TagCountOrderByAggregateInputSchema: z.ZodType<Prisma.TagCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
});

export const TagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TagMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
});

export const TagMinOrderByAggregateInputSchema: z.ZodType<Prisma.TagMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
});

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
});

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const RequiredSkillListRelationFilterSchema: z.ZodType<Prisma.RequiredSkillListRelationFilter> = z.strictObject({
  every: z.lazy(() => RequiredSkillWhereInputSchema).optional(),
  some: z.lazy(() => RequiredSkillWhereInputSchema).optional(),
  none: z.lazy(() => RequiredSkillWhereInputSchema).optional(),
});

export const JobApplicationStatusHistoryListRelationFilterSchema: z.ZodType<Prisma.JobApplicationStatusHistoryListRelationFilter> = z.strictObject({
  every: z.lazy(() => JobApplicationStatusHistoryWhereInputSchema).optional(),
  some: z.lazy(() => JobApplicationStatusHistoryWhereInputSchema).optional(),
  none: z.lazy(() => JobApplicationStatusHistoryWhereInputSchema).optional(),
});

export const ReminderListRelationFilterSchema: z.ZodType<Prisma.ReminderListRelationFilter> = z.strictObject({
  every: z.lazy(() => ReminderWhereInputSchema).optional(),
  some: z.lazy(() => ReminderWhereInputSchema).optional(),
  none: z.lazy(() => ReminderWhereInputSchema).optional(),
});

export const RequiredSkillOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RequiredSkillOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const JobApplicationStatusHistoryOrderByRelationAggregateInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const ReminderOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ReminderOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const JobApplicationUserIdStatusOrderCompoundUniqueInputSchema: z.ZodType<Prisma.JobApplicationUserIdStatusOrderCompoundUniqueInput> = z.strictObject({
  userId: z.string(),
  status: z.lazy(() => JobApplicationStatusSchema),
  order: z.number(),
});

export const JobApplicationCountOrderByAggregateInputSchema: z.ZodType<Prisma.JobApplicationCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  company: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  sourceName: z.lazy(() => SortOrderSchema).optional(),
  sourceUrl: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  resumeUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
});

export const JobApplicationAvgOrderByAggregateInputSchema: z.ZodType<Prisma.JobApplicationAvgOrderByAggregateInput> = z.strictObject({
  order: z.lazy(() => SortOrderSchema).optional(),
});

export const JobApplicationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.JobApplicationMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  company: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  sourceName: z.lazy(() => SortOrderSchema).optional(),
  sourceUrl: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  resumeUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
});

export const JobApplicationMinOrderByAggregateInputSchema: z.ZodType<Prisma.JobApplicationMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  company: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  sourceName: z.lazy(() => SortOrderSchema).optional(),
  sourceUrl: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  resumeUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
});

export const JobApplicationSumOrderByAggregateInputSchema: z.ZodType<Prisma.JobApplicationSumOrderByAggregateInput> = z.strictObject({
  order: z.lazy(() => SortOrderSchema).optional(),
});

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
});

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
});

export const JobApplicationCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.JobApplicationCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutUserInputSchema), z.lazy(() => JobApplicationCreateWithoutUserInputSchema).array(), z.lazy(() => JobApplicationUncheckedCreateWithoutUserInputSchema), z.lazy(() => JobApplicationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobApplicationCreateOrConnectWithoutUserInputSchema), z.lazy(() => JobApplicationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobApplicationCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema), z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
});

export const TagCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TagCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => TagCreateWithoutUserInputSchema), z.lazy(() => TagCreateWithoutUserInputSchema).array(), z.lazy(() => TagUncheckedCreateWithoutUserInputSchema), z.lazy(() => TagUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutUserInputSchema), z.lazy(() => TagCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TagCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
});

export const JobApplicationUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.JobApplicationUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutUserInputSchema), z.lazy(() => JobApplicationCreateWithoutUserInputSchema).array(), z.lazy(() => JobApplicationUncheckedCreateWithoutUserInputSchema), z.lazy(() => JobApplicationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobApplicationCreateOrConnectWithoutUserInputSchema), z.lazy(() => JobApplicationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobApplicationCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema), z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
});

export const TagUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TagUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => TagCreateWithoutUserInputSchema), z.lazy(() => TagCreateWithoutUserInputSchema).array(), z.lazy(() => TagUncheckedCreateWithoutUserInputSchema), z.lazy(() => TagUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutUserInputSchema), z.lazy(() => TagCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TagCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
});

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional(),
});

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional().nullable(),
});

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.strictObject({
  set: z.coerce.date().optional(),
});

export const JobApplicationUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.JobApplicationUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutUserInputSchema), z.lazy(() => JobApplicationCreateWithoutUserInputSchema).array(), z.lazy(() => JobApplicationUncheckedCreateWithoutUserInputSchema), z.lazy(() => JobApplicationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobApplicationCreateOrConnectWithoutUserInputSchema), z.lazy(() => JobApplicationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => JobApplicationUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => JobApplicationUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobApplicationCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema), z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema), z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema), z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema), z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => JobApplicationUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => JobApplicationUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => JobApplicationUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => JobApplicationUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => JobApplicationScalarWhereInputSchema), z.lazy(() => JobApplicationScalarWhereInputSchema).array() ]).optional(),
});

export const TagUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TagUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => TagCreateWithoutUserInputSchema), z.lazy(() => TagCreateWithoutUserInputSchema).array(), z.lazy(() => TagUncheckedCreateWithoutUserInputSchema), z.lazy(() => TagUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutUserInputSchema), z.lazy(() => TagCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TagUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => TagUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TagCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TagUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => TagUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TagUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => TagUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TagScalarWhereInputSchema), z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
});

export const JobApplicationUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.JobApplicationUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutUserInputSchema), z.lazy(() => JobApplicationCreateWithoutUserInputSchema).array(), z.lazy(() => JobApplicationUncheckedCreateWithoutUserInputSchema), z.lazy(() => JobApplicationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobApplicationCreateOrConnectWithoutUserInputSchema), z.lazy(() => JobApplicationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => JobApplicationUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => JobApplicationUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobApplicationCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema), z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema), z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema), z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema), z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => JobApplicationUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => JobApplicationUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => JobApplicationUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => JobApplicationUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => JobApplicationScalarWhereInputSchema), z.lazy(() => JobApplicationScalarWhereInputSchema).array() ]).optional(),
});

export const TagUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => TagCreateWithoutUserInputSchema), z.lazy(() => TagCreateWithoutUserInputSchema).array(), z.lazy(() => TagUncheckedCreateWithoutUserInputSchema), z.lazy(() => TagUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutUserInputSchema), z.lazy(() => TagCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TagUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => TagUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TagCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TagUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => TagUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TagUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => TagUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TagScalarWhereInputSchema), z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
});

export const JobApplicationCreateNestedOneWithoutRequiredSkillInputSchema: z.ZodType<Prisma.JobApplicationCreateNestedOneWithoutRequiredSkillInput> = z.strictObject({
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutRequiredSkillInputSchema), z.lazy(() => JobApplicationUncheckedCreateWithoutRequiredSkillInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => JobApplicationCreateOrConnectWithoutRequiredSkillInputSchema).optional(),
  connect: z.lazy(() => JobApplicationWhereUniqueInputSchema).optional(),
});

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.strictObject({
  set: z.boolean().optional(),
});

export const JobApplicationUpdateOneRequiredWithoutRequiredSkillNestedInputSchema: z.ZodType<Prisma.JobApplicationUpdateOneRequiredWithoutRequiredSkillNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutRequiredSkillInputSchema), z.lazy(() => JobApplicationUncheckedCreateWithoutRequiredSkillInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => JobApplicationCreateOrConnectWithoutRequiredSkillInputSchema).optional(),
  upsert: z.lazy(() => JobApplicationUpsertWithoutRequiredSkillInputSchema).optional(),
  connect: z.lazy(() => JobApplicationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => JobApplicationUpdateToOneWithWhereWithoutRequiredSkillInputSchema), z.lazy(() => JobApplicationUpdateWithoutRequiredSkillInputSchema), z.lazy(() => JobApplicationUncheckedUpdateWithoutRequiredSkillInputSchema) ]).optional(),
});

export const JobApplicationCreateNestedOneWithoutJobApplicationStatusHistoryInputSchema: z.ZodType<Prisma.JobApplicationCreateNestedOneWithoutJobApplicationStatusHistoryInput> = z.strictObject({
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutJobApplicationStatusHistoryInputSchema), z.lazy(() => JobApplicationUncheckedCreateWithoutJobApplicationStatusHistoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => JobApplicationCreateOrConnectWithoutJobApplicationStatusHistoryInputSchema).optional(),
  connect: z.lazy(() => JobApplicationWhereUniqueInputSchema).optional(),
});

export const EnumJobApplicationStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumJobApplicationStatusFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => JobApplicationStatusSchema).optional(),
});

export const JobApplicationUpdateOneRequiredWithoutJobApplicationStatusHistoryNestedInputSchema: z.ZodType<Prisma.JobApplicationUpdateOneRequiredWithoutJobApplicationStatusHistoryNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutJobApplicationStatusHistoryInputSchema), z.lazy(() => JobApplicationUncheckedCreateWithoutJobApplicationStatusHistoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => JobApplicationCreateOrConnectWithoutJobApplicationStatusHistoryInputSchema).optional(),
  upsert: z.lazy(() => JobApplicationUpsertWithoutJobApplicationStatusHistoryInputSchema).optional(),
  connect: z.lazy(() => JobApplicationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => JobApplicationUpdateToOneWithWhereWithoutJobApplicationStatusHistoryInputSchema), z.lazy(() => JobApplicationUpdateWithoutJobApplicationStatusHistoryInputSchema), z.lazy(() => JobApplicationUncheckedUpdateWithoutJobApplicationStatusHistoryInputSchema) ]).optional(),
});

export const JobApplicationCreateNestedOneWithoutRemindersInputSchema: z.ZodType<Prisma.JobApplicationCreateNestedOneWithoutRemindersInput> = z.strictObject({
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutRemindersInputSchema), z.lazy(() => JobApplicationUncheckedCreateWithoutRemindersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => JobApplicationCreateOrConnectWithoutRemindersInputSchema).optional(),
  connect: z.lazy(() => JobApplicationWhereUniqueInputSchema).optional(),
});

export const JobApplicationUpdateOneRequiredWithoutRemindersNestedInputSchema: z.ZodType<Prisma.JobApplicationUpdateOneRequiredWithoutRemindersNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutRemindersInputSchema), z.lazy(() => JobApplicationUncheckedCreateWithoutRemindersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => JobApplicationCreateOrConnectWithoutRemindersInputSchema).optional(),
  upsert: z.lazy(() => JobApplicationUpsertWithoutRemindersInputSchema).optional(),
  connect: z.lazy(() => JobApplicationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => JobApplicationUpdateToOneWithWhereWithoutRemindersInputSchema), z.lazy(() => JobApplicationUpdateWithoutRemindersInputSchema), z.lazy(() => JobApplicationUncheckedUpdateWithoutRemindersInputSchema) ]).optional(),
});

export const UserCreateNestedOneWithoutAvailableTagsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAvailableTagsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutAvailableTagsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAvailableTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAvailableTagsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const JobApplicationCreateNestedManyWithoutTagsInputSchema: z.ZodType<Prisma.JobApplicationCreateNestedManyWithoutTagsInput> = z.strictObject({
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutTagsInputSchema), z.lazy(() => JobApplicationCreateWithoutTagsInputSchema).array(), z.lazy(() => JobApplicationUncheckedCreateWithoutTagsInputSchema), z.lazy(() => JobApplicationUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobApplicationCreateOrConnectWithoutTagsInputSchema), z.lazy(() => JobApplicationCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema), z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
});

export const JobApplicationUncheckedCreateNestedManyWithoutTagsInputSchema: z.ZodType<Prisma.JobApplicationUncheckedCreateNestedManyWithoutTagsInput> = z.strictObject({
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutTagsInputSchema), z.lazy(() => JobApplicationCreateWithoutTagsInputSchema).array(), z.lazy(() => JobApplicationUncheckedCreateWithoutTagsInputSchema), z.lazy(() => JobApplicationUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobApplicationCreateOrConnectWithoutTagsInputSchema), z.lazy(() => JobApplicationCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema), z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
});

export const UserUpdateOneRequiredWithoutAvailableTagsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAvailableTagsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutAvailableTagsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAvailableTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAvailableTagsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAvailableTagsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAvailableTagsInputSchema), z.lazy(() => UserUpdateWithoutAvailableTagsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAvailableTagsInputSchema) ]).optional(),
});

export const JobApplicationUpdateManyWithoutTagsNestedInputSchema: z.ZodType<Prisma.JobApplicationUpdateManyWithoutTagsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutTagsInputSchema), z.lazy(() => JobApplicationCreateWithoutTagsInputSchema).array(), z.lazy(() => JobApplicationUncheckedCreateWithoutTagsInputSchema), z.lazy(() => JobApplicationUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobApplicationCreateOrConnectWithoutTagsInputSchema), z.lazy(() => JobApplicationCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => JobApplicationUpsertWithWhereUniqueWithoutTagsInputSchema), z.lazy(() => JobApplicationUpsertWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema), z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema), z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema), z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema), z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => JobApplicationUpdateWithWhereUniqueWithoutTagsInputSchema), z.lazy(() => JobApplicationUpdateWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => JobApplicationUpdateManyWithWhereWithoutTagsInputSchema), z.lazy(() => JobApplicationUpdateManyWithWhereWithoutTagsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => JobApplicationScalarWhereInputSchema), z.lazy(() => JobApplicationScalarWhereInputSchema).array() ]).optional(),
});

export const JobApplicationUncheckedUpdateManyWithoutTagsNestedInputSchema: z.ZodType<Prisma.JobApplicationUncheckedUpdateManyWithoutTagsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutTagsInputSchema), z.lazy(() => JobApplicationCreateWithoutTagsInputSchema).array(), z.lazy(() => JobApplicationUncheckedCreateWithoutTagsInputSchema), z.lazy(() => JobApplicationUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobApplicationCreateOrConnectWithoutTagsInputSchema), z.lazy(() => JobApplicationCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => JobApplicationUpsertWithWhereUniqueWithoutTagsInputSchema), z.lazy(() => JobApplicationUpsertWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema), z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema), z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema), z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema), z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => JobApplicationUpdateWithWhereUniqueWithoutTagsInputSchema), z.lazy(() => JobApplicationUpdateWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => JobApplicationUpdateManyWithWhereWithoutTagsInputSchema), z.lazy(() => JobApplicationUpdateManyWithWhereWithoutTagsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => JobApplicationScalarWhereInputSchema), z.lazy(() => JobApplicationScalarWhereInputSchema).array() ]).optional(),
});

export const UserCreateNestedOneWithoutJobApplicationsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutJobApplicationsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutJobApplicationsInputSchema), z.lazy(() => UserUncheckedCreateWithoutJobApplicationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutJobApplicationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const RequiredSkillCreateNestedManyWithoutJobApplicationInputSchema: z.ZodType<Prisma.RequiredSkillCreateNestedManyWithoutJobApplicationInput> = z.strictObject({
  create: z.union([ z.lazy(() => RequiredSkillCreateWithoutJobApplicationInputSchema), z.lazy(() => RequiredSkillCreateWithoutJobApplicationInputSchema).array(), z.lazy(() => RequiredSkillUncheckedCreateWithoutJobApplicationInputSchema), z.lazy(() => RequiredSkillUncheckedCreateWithoutJobApplicationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RequiredSkillCreateOrConnectWithoutJobApplicationInputSchema), z.lazy(() => RequiredSkillCreateOrConnectWithoutJobApplicationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RequiredSkillCreateManyJobApplicationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RequiredSkillWhereUniqueInputSchema), z.lazy(() => RequiredSkillWhereUniqueInputSchema).array() ]).optional(),
});

export const JobApplicationStatusHistoryCreateNestedManyWithoutJobApplicationInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryCreateNestedManyWithoutJobApplicationInput> = z.strictObject({
  create: z.union([ z.lazy(() => JobApplicationStatusHistoryCreateWithoutJobApplicationInputSchema), z.lazy(() => JobApplicationStatusHistoryCreateWithoutJobApplicationInputSchema).array(), z.lazy(() => JobApplicationStatusHistoryUncheckedCreateWithoutJobApplicationInputSchema), z.lazy(() => JobApplicationStatusHistoryUncheckedCreateWithoutJobApplicationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobApplicationStatusHistoryCreateOrConnectWithoutJobApplicationInputSchema), z.lazy(() => JobApplicationStatusHistoryCreateOrConnectWithoutJobApplicationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobApplicationStatusHistoryCreateManyJobApplicationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => JobApplicationStatusHistoryWhereUniqueInputSchema), z.lazy(() => JobApplicationStatusHistoryWhereUniqueInputSchema).array() ]).optional(),
});

export const ReminderCreateNestedManyWithoutJobApplicationInputSchema: z.ZodType<Prisma.ReminderCreateNestedManyWithoutJobApplicationInput> = z.strictObject({
  create: z.union([ z.lazy(() => ReminderCreateWithoutJobApplicationInputSchema), z.lazy(() => ReminderCreateWithoutJobApplicationInputSchema).array(), z.lazy(() => ReminderUncheckedCreateWithoutJobApplicationInputSchema), z.lazy(() => ReminderUncheckedCreateWithoutJobApplicationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReminderCreateOrConnectWithoutJobApplicationInputSchema), z.lazy(() => ReminderCreateOrConnectWithoutJobApplicationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReminderCreateManyJobApplicationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema), z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
});

export const TagCreateNestedManyWithoutJobApplicationsInputSchema: z.ZodType<Prisma.TagCreateNestedManyWithoutJobApplicationsInput> = z.strictObject({
  create: z.union([ z.lazy(() => TagCreateWithoutJobApplicationsInputSchema), z.lazy(() => TagCreateWithoutJobApplicationsInputSchema).array(), z.lazy(() => TagUncheckedCreateWithoutJobApplicationsInputSchema), z.lazy(() => TagUncheckedCreateWithoutJobApplicationsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutJobApplicationsInputSchema), z.lazy(() => TagCreateOrConnectWithoutJobApplicationsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
});

export const RequiredSkillUncheckedCreateNestedManyWithoutJobApplicationInputSchema: z.ZodType<Prisma.RequiredSkillUncheckedCreateNestedManyWithoutJobApplicationInput> = z.strictObject({
  create: z.union([ z.lazy(() => RequiredSkillCreateWithoutJobApplicationInputSchema), z.lazy(() => RequiredSkillCreateWithoutJobApplicationInputSchema).array(), z.lazy(() => RequiredSkillUncheckedCreateWithoutJobApplicationInputSchema), z.lazy(() => RequiredSkillUncheckedCreateWithoutJobApplicationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RequiredSkillCreateOrConnectWithoutJobApplicationInputSchema), z.lazy(() => RequiredSkillCreateOrConnectWithoutJobApplicationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RequiredSkillCreateManyJobApplicationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RequiredSkillWhereUniqueInputSchema), z.lazy(() => RequiredSkillWhereUniqueInputSchema).array() ]).optional(),
});

export const JobApplicationStatusHistoryUncheckedCreateNestedManyWithoutJobApplicationInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryUncheckedCreateNestedManyWithoutJobApplicationInput> = z.strictObject({
  create: z.union([ z.lazy(() => JobApplicationStatusHistoryCreateWithoutJobApplicationInputSchema), z.lazy(() => JobApplicationStatusHistoryCreateWithoutJobApplicationInputSchema).array(), z.lazy(() => JobApplicationStatusHistoryUncheckedCreateWithoutJobApplicationInputSchema), z.lazy(() => JobApplicationStatusHistoryUncheckedCreateWithoutJobApplicationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobApplicationStatusHistoryCreateOrConnectWithoutJobApplicationInputSchema), z.lazy(() => JobApplicationStatusHistoryCreateOrConnectWithoutJobApplicationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobApplicationStatusHistoryCreateManyJobApplicationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => JobApplicationStatusHistoryWhereUniqueInputSchema), z.lazy(() => JobApplicationStatusHistoryWhereUniqueInputSchema).array() ]).optional(),
});

export const ReminderUncheckedCreateNestedManyWithoutJobApplicationInputSchema: z.ZodType<Prisma.ReminderUncheckedCreateNestedManyWithoutJobApplicationInput> = z.strictObject({
  create: z.union([ z.lazy(() => ReminderCreateWithoutJobApplicationInputSchema), z.lazy(() => ReminderCreateWithoutJobApplicationInputSchema).array(), z.lazy(() => ReminderUncheckedCreateWithoutJobApplicationInputSchema), z.lazy(() => ReminderUncheckedCreateWithoutJobApplicationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReminderCreateOrConnectWithoutJobApplicationInputSchema), z.lazy(() => ReminderCreateOrConnectWithoutJobApplicationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReminderCreateManyJobApplicationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema), z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
});

export const TagUncheckedCreateNestedManyWithoutJobApplicationsInputSchema: z.ZodType<Prisma.TagUncheckedCreateNestedManyWithoutJobApplicationsInput> = z.strictObject({
  create: z.union([ z.lazy(() => TagCreateWithoutJobApplicationsInputSchema), z.lazy(() => TagCreateWithoutJobApplicationsInputSchema).array(), z.lazy(() => TagUncheckedCreateWithoutJobApplicationsInputSchema), z.lazy(() => TagUncheckedCreateWithoutJobApplicationsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutJobApplicationsInputSchema), z.lazy(() => TagCreateOrConnectWithoutJobApplicationsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
});

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.strictObject({
  set: z.coerce.date().optional().nullable(),
});

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const UserUpdateOneRequiredWithoutJobApplicationsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutJobApplicationsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutJobApplicationsInputSchema), z.lazy(() => UserUncheckedCreateWithoutJobApplicationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutJobApplicationsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutJobApplicationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutJobApplicationsInputSchema), z.lazy(() => UserUpdateWithoutJobApplicationsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutJobApplicationsInputSchema) ]).optional(),
});

export const RequiredSkillUpdateManyWithoutJobApplicationNestedInputSchema: z.ZodType<Prisma.RequiredSkillUpdateManyWithoutJobApplicationNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => RequiredSkillCreateWithoutJobApplicationInputSchema), z.lazy(() => RequiredSkillCreateWithoutJobApplicationInputSchema).array(), z.lazy(() => RequiredSkillUncheckedCreateWithoutJobApplicationInputSchema), z.lazy(() => RequiredSkillUncheckedCreateWithoutJobApplicationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RequiredSkillCreateOrConnectWithoutJobApplicationInputSchema), z.lazy(() => RequiredSkillCreateOrConnectWithoutJobApplicationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RequiredSkillUpsertWithWhereUniqueWithoutJobApplicationInputSchema), z.lazy(() => RequiredSkillUpsertWithWhereUniqueWithoutJobApplicationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RequiredSkillCreateManyJobApplicationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RequiredSkillWhereUniqueInputSchema), z.lazy(() => RequiredSkillWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RequiredSkillWhereUniqueInputSchema), z.lazy(() => RequiredSkillWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RequiredSkillWhereUniqueInputSchema), z.lazy(() => RequiredSkillWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RequiredSkillWhereUniqueInputSchema), z.lazy(() => RequiredSkillWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RequiredSkillUpdateWithWhereUniqueWithoutJobApplicationInputSchema), z.lazy(() => RequiredSkillUpdateWithWhereUniqueWithoutJobApplicationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RequiredSkillUpdateManyWithWhereWithoutJobApplicationInputSchema), z.lazy(() => RequiredSkillUpdateManyWithWhereWithoutJobApplicationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RequiredSkillScalarWhereInputSchema), z.lazy(() => RequiredSkillScalarWhereInputSchema).array() ]).optional(),
});

export const JobApplicationStatusHistoryUpdateManyWithoutJobApplicationNestedInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryUpdateManyWithoutJobApplicationNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => JobApplicationStatusHistoryCreateWithoutJobApplicationInputSchema), z.lazy(() => JobApplicationStatusHistoryCreateWithoutJobApplicationInputSchema).array(), z.lazy(() => JobApplicationStatusHistoryUncheckedCreateWithoutJobApplicationInputSchema), z.lazy(() => JobApplicationStatusHistoryUncheckedCreateWithoutJobApplicationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobApplicationStatusHistoryCreateOrConnectWithoutJobApplicationInputSchema), z.lazy(() => JobApplicationStatusHistoryCreateOrConnectWithoutJobApplicationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => JobApplicationStatusHistoryUpsertWithWhereUniqueWithoutJobApplicationInputSchema), z.lazy(() => JobApplicationStatusHistoryUpsertWithWhereUniqueWithoutJobApplicationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobApplicationStatusHistoryCreateManyJobApplicationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => JobApplicationStatusHistoryWhereUniqueInputSchema), z.lazy(() => JobApplicationStatusHistoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => JobApplicationStatusHistoryWhereUniqueInputSchema), z.lazy(() => JobApplicationStatusHistoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => JobApplicationStatusHistoryWhereUniqueInputSchema), z.lazy(() => JobApplicationStatusHistoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => JobApplicationStatusHistoryWhereUniqueInputSchema), z.lazy(() => JobApplicationStatusHistoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => JobApplicationStatusHistoryUpdateWithWhereUniqueWithoutJobApplicationInputSchema), z.lazy(() => JobApplicationStatusHistoryUpdateWithWhereUniqueWithoutJobApplicationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => JobApplicationStatusHistoryUpdateManyWithWhereWithoutJobApplicationInputSchema), z.lazy(() => JobApplicationStatusHistoryUpdateManyWithWhereWithoutJobApplicationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => JobApplicationStatusHistoryScalarWhereInputSchema), z.lazy(() => JobApplicationStatusHistoryScalarWhereInputSchema).array() ]).optional(),
});

export const ReminderUpdateManyWithoutJobApplicationNestedInputSchema: z.ZodType<Prisma.ReminderUpdateManyWithoutJobApplicationNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ReminderCreateWithoutJobApplicationInputSchema), z.lazy(() => ReminderCreateWithoutJobApplicationInputSchema).array(), z.lazy(() => ReminderUncheckedCreateWithoutJobApplicationInputSchema), z.lazy(() => ReminderUncheckedCreateWithoutJobApplicationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReminderCreateOrConnectWithoutJobApplicationInputSchema), z.lazy(() => ReminderCreateOrConnectWithoutJobApplicationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReminderUpsertWithWhereUniqueWithoutJobApplicationInputSchema), z.lazy(() => ReminderUpsertWithWhereUniqueWithoutJobApplicationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReminderCreateManyJobApplicationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema), z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema), z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema), z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema), z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReminderUpdateWithWhereUniqueWithoutJobApplicationInputSchema), z.lazy(() => ReminderUpdateWithWhereUniqueWithoutJobApplicationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReminderUpdateManyWithWhereWithoutJobApplicationInputSchema), z.lazy(() => ReminderUpdateManyWithWhereWithoutJobApplicationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReminderScalarWhereInputSchema), z.lazy(() => ReminderScalarWhereInputSchema).array() ]).optional(),
});

export const TagUpdateManyWithoutJobApplicationsNestedInputSchema: z.ZodType<Prisma.TagUpdateManyWithoutJobApplicationsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => TagCreateWithoutJobApplicationsInputSchema), z.lazy(() => TagCreateWithoutJobApplicationsInputSchema).array(), z.lazy(() => TagUncheckedCreateWithoutJobApplicationsInputSchema), z.lazy(() => TagUncheckedCreateWithoutJobApplicationsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutJobApplicationsInputSchema), z.lazy(() => TagCreateOrConnectWithoutJobApplicationsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TagUpsertWithWhereUniqueWithoutJobApplicationsInputSchema), z.lazy(() => TagUpsertWithWhereUniqueWithoutJobApplicationsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TagUpdateWithWhereUniqueWithoutJobApplicationsInputSchema), z.lazy(() => TagUpdateWithWhereUniqueWithoutJobApplicationsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TagUpdateManyWithWhereWithoutJobApplicationsInputSchema), z.lazy(() => TagUpdateManyWithWhereWithoutJobApplicationsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TagScalarWhereInputSchema), z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
});

export const RequiredSkillUncheckedUpdateManyWithoutJobApplicationNestedInputSchema: z.ZodType<Prisma.RequiredSkillUncheckedUpdateManyWithoutJobApplicationNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => RequiredSkillCreateWithoutJobApplicationInputSchema), z.lazy(() => RequiredSkillCreateWithoutJobApplicationInputSchema).array(), z.lazy(() => RequiredSkillUncheckedCreateWithoutJobApplicationInputSchema), z.lazy(() => RequiredSkillUncheckedCreateWithoutJobApplicationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RequiredSkillCreateOrConnectWithoutJobApplicationInputSchema), z.lazy(() => RequiredSkillCreateOrConnectWithoutJobApplicationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RequiredSkillUpsertWithWhereUniqueWithoutJobApplicationInputSchema), z.lazy(() => RequiredSkillUpsertWithWhereUniqueWithoutJobApplicationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RequiredSkillCreateManyJobApplicationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RequiredSkillWhereUniqueInputSchema), z.lazy(() => RequiredSkillWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RequiredSkillWhereUniqueInputSchema), z.lazy(() => RequiredSkillWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RequiredSkillWhereUniqueInputSchema), z.lazy(() => RequiredSkillWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RequiredSkillWhereUniqueInputSchema), z.lazy(() => RequiredSkillWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RequiredSkillUpdateWithWhereUniqueWithoutJobApplicationInputSchema), z.lazy(() => RequiredSkillUpdateWithWhereUniqueWithoutJobApplicationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RequiredSkillUpdateManyWithWhereWithoutJobApplicationInputSchema), z.lazy(() => RequiredSkillUpdateManyWithWhereWithoutJobApplicationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RequiredSkillScalarWhereInputSchema), z.lazy(() => RequiredSkillScalarWhereInputSchema).array() ]).optional(),
});

export const JobApplicationStatusHistoryUncheckedUpdateManyWithoutJobApplicationNestedInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryUncheckedUpdateManyWithoutJobApplicationNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => JobApplicationStatusHistoryCreateWithoutJobApplicationInputSchema), z.lazy(() => JobApplicationStatusHistoryCreateWithoutJobApplicationInputSchema).array(), z.lazy(() => JobApplicationStatusHistoryUncheckedCreateWithoutJobApplicationInputSchema), z.lazy(() => JobApplicationStatusHistoryUncheckedCreateWithoutJobApplicationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobApplicationStatusHistoryCreateOrConnectWithoutJobApplicationInputSchema), z.lazy(() => JobApplicationStatusHistoryCreateOrConnectWithoutJobApplicationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => JobApplicationStatusHistoryUpsertWithWhereUniqueWithoutJobApplicationInputSchema), z.lazy(() => JobApplicationStatusHistoryUpsertWithWhereUniqueWithoutJobApplicationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobApplicationStatusHistoryCreateManyJobApplicationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => JobApplicationStatusHistoryWhereUniqueInputSchema), z.lazy(() => JobApplicationStatusHistoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => JobApplicationStatusHistoryWhereUniqueInputSchema), z.lazy(() => JobApplicationStatusHistoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => JobApplicationStatusHistoryWhereUniqueInputSchema), z.lazy(() => JobApplicationStatusHistoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => JobApplicationStatusHistoryWhereUniqueInputSchema), z.lazy(() => JobApplicationStatusHistoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => JobApplicationStatusHistoryUpdateWithWhereUniqueWithoutJobApplicationInputSchema), z.lazy(() => JobApplicationStatusHistoryUpdateWithWhereUniqueWithoutJobApplicationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => JobApplicationStatusHistoryUpdateManyWithWhereWithoutJobApplicationInputSchema), z.lazy(() => JobApplicationStatusHistoryUpdateManyWithWhereWithoutJobApplicationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => JobApplicationStatusHistoryScalarWhereInputSchema), z.lazy(() => JobApplicationStatusHistoryScalarWhereInputSchema).array() ]).optional(),
});

export const ReminderUncheckedUpdateManyWithoutJobApplicationNestedInputSchema: z.ZodType<Prisma.ReminderUncheckedUpdateManyWithoutJobApplicationNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ReminderCreateWithoutJobApplicationInputSchema), z.lazy(() => ReminderCreateWithoutJobApplicationInputSchema).array(), z.lazy(() => ReminderUncheckedCreateWithoutJobApplicationInputSchema), z.lazy(() => ReminderUncheckedCreateWithoutJobApplicationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReminderCreateOrConnectWithoutJobApplicationInputSchema), z.lazy(() => ReminderCreateOrConnectWithoutJobApplicationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReminderUpsertWithWhereUniqueWithoutJobApplicationInputSchema), z.lazy(() => ReminderUpsertWithWhereUniqueWithoutJobApplicationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReminderCreateManyJobApplicationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema), z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema), z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema), z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema), z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReminderUpdateWithWhereUniqueWithoutJobApplicationInputSchema), z.lazy(() => ReminderUpdateWithWhereUniqueWithoutJobApplicationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReminderUpdateManyWithWhereWithoutJobApplicationInputSchema), z.lazy(() => ReminderUpdateManyWithWhereWithoutJobApplicationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReminderScalarWhereInputSchema), z.lazy(() => ReminderScalarWhereInputSchema).array() ]).optional(),
});

export const TagUncheckedUpdateManyWithoutJobApplicationsNestedInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyWithoutJobApplicationsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => TagCreateWithoutJobApplicationsInputSchema), z.lazy(() => TagCreateWithoutJobApplicationsInputSchema).array(), z.lazy(() => TagUncheckedCreateWithoutJobApplicationsInputSchema), z.lazy(() => TagUncheckedCreateWithoutJobApplicationsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutJobApplicationsInputSchema), z.lazy(() => TagCreateOrConnectWithoutJobApplicationsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TagUpsertWithWhereUniqueWithoutJobApplicationsInputSchema), z.lazy(() => TagUpsertWithWhereUniqueWithoutJobApplicationsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TagUpdateWithWhereUniqueWithoutJobApplicationsInputSchema), z.lazy(() => TagUpdateWithWhereUniqueWithoutJobApplicationsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TagUpdateManyWithWhereWithoutJobApplicationsInputSchema), z.lazy(() => TagUpdateManyWithWhereWithoutJobApplicationsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TagScalarWhereInputSchema), z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
});

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
});

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
});

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
});

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
});

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
});

export const NestedEnumJobApplicationStatusFilterSchema: z.ZodType<Prisma.NestedEnumJobApplicationStatusFilter> = z.strictObject({
  equals: z.lazy(() => JobApplicationStatusSchema).optional(),
  in: z.lazy(() => JobApplicationStatusSchema).array().optional(),
  notIn: z.lazy(() => JobApplicationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => NestedEnumJobApplicationStatusFilterSchema) ]).optional(),
});

export const NestedEnumJobApplicationStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumJobApplicationStatusWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => JobApplicationStatusSchema).optional(),
  in: z.lazy(() => JobApplicationStatusSchema).array().optional(),
  notIn: z.lazy(() => JobApplicationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => NestedEnumJobApplicationStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumJobApplicationStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumJobApplicationStatusFilterSchema).optional(),
});

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
});

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
});

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
});

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
});

export const JobApplicationCreateWithoutUserInputSchema: z.ZodType<Prisma.JobApplicationCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  company: z.string(),
  location: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => JobApplicationStatusSchema).optional(),
  sourceName: z.string().optional().nullable(),
  sourceUrl: z.string().optional().nullable(),
  resumeUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  order: z.number().int().optional(),
  requiredSkill: z.lazy(() => RequiredSkillCreateNestedManyWithoutJobApplicationInputSchema).optional(),
  jobApplicationStatusHistory: z.lazy(() => JobApplicationStatusHistoryCreateNestedManyWithoutJobApplicationInputSchema).optional(),
  reminders: z.lazy(() => ReminderCreateNestedManyWithoutJobApplicationInputSchema).optional(),
  tags: z.lazy(() => TagCreateNestedManyWithoutJobApplicationsInputSchema).optional(),
});

export const JobApplicationUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.JobApplicationUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  company: z.string(),
  location: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => JobApplicationStatusSchema).optional(),
  sourceName: z.string().optional().nullable(),
  sourceUrl: z.string().optional().nullable(),
  resumeUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  order: z.number().int().optional(),
  requiredSkill: z.lazy(() => RequiredSkillUncheckedCreateNestedManyWithoutJobApplicationInputSchema).optional(),
  jobApplicationStatusHistory: z.lazy(() => JobApplicationStatusHistoryUncheckedCreateNestedManyWithoutJobApplicationInputSchema).optional(),
  reminders: z.lazy(() => ReminderUncheckedCreateNestedManyWithoutJobApplicationInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutJobApplicationsInputSchema).optional(),
});

export const JobApplicationCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.JobApplicationCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => JobApplicationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutUserInputSchema), z.lazy(() => JobApplicationUncheckedCreateWithoutUserInputSchema) ]),
});

export const JobApplicationCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.JobApplicationCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => JobApplicationCreateManyUserInputSchema), z.lazy(() => JobApplicationCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const TagCreateWithoutUserInputSchema: z.ZodType<Prisma.TagCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  color: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  jobApplications: z.lazy(() => JobApplicationCreateNestedManyWithoutTagsInputSchema).optional(),
});

export const TagUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.TagUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  color: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  jobApplications: z.lazy(() => JobApplicationUncheckedCreateNestedManyWithoutTagsInputSchema).optional(),
});

export const TagCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.TagCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TagCreateWithoutUserInputSchema), z.lazy(() => TagUncheckedCreateWithoutUserInputSchema) ]),
});

export const TagCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.TagCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => TagCreateManyUserInputSchema), z.lazy(() => TagCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const JobApplicationUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.JobApplicationUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => JobApplicationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => JobApplicationUpdateWithoutUserInputSchema), z.lazy(() => JobApplicationUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutUserInputSchema), z.lazy(() => JobApplicationUncheckedCreateWithoutUserInputSchema) ]),
});

export const JobApplicationUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.JobApplicationUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => JobApplicationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => JobApplicationUpdateWithoutUserInputSchema), z.lazy(() => JobApplicationUncheckedUpdateWithoutUserInputSchema) ]),
});

export const JobApplicationUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.JobApplicationUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => JobApplicationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => JobApplicationUpdateManyMutationInputSchema), z.lazy(() => JobApplicationUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const JobApplicationScalarWhereInputSchema: z.ZodType<Prisma.JobApplicationScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => JobApplicationScalarWhereInputSchema), z.lazy(() => JobApplicationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobApplicationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobApplicationScalarWhereInputSchema), z.lazy(() => JobApplicationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  company: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  location: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumJobApplicationStatusFilterSchema), z.lazy(() => JobApplicationStatusSchema) ]).optional(),
  sourceName: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  sourceUrl: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  resumeUrl: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  order: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
});

export const TagUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TagUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TagUpdateWithoutUserInputSchema), z.lazy(() => TagUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => TagCreateWithoutUserInputSchema), z.lazy(() => TagUncheckedCreateWithoutUserInputSchema) ]),
});

export const TagUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TagUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TagUpdateWithoutUserInputSchema), z.lazy(() => TagUncheckedUpdateWithoutUserInputSchema) ]),
});

export const TagUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.TagUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => TagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TagUpdateManyMutationInputSchema), z.lazy(() => TagUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const TagScalarWhereInputSchema: z.ZodType<Prisma.TagScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => TagScalarWhereInputSchema), z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagScalarWhereInputSchema), z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  color: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const JobApplicationCreateWithoutRequiredSkillInputSchema: z.ZodType<Prisma.JobApplicationCreateWithoutRequiredSkillInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  company: z.string(),
  location: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => JobApplicationStatusSchema).optional(),
  sourceName: z.string().optional().nullable(),
  sourceUrl: z.string().optional().nullable(),
  resumeUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  order: z.number().int().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutJobApplicationsInputSchema),
  jobApplicationStatusHistory: z.lazy(() => JobApplicationStatusHistoryCreateNestedManyWithoutJobApplicationInputSchema).optional(),
  reminders: z.lazy(() => ReminderCreateNestedManyWithoutJobApplicationInputSchema).optional(),
  tags: z.lazy(() => TagCreateNestedManyWithoutJobApplicationsInputSchema).optional(),
});

export const JobApplicationUncheckedCreateWithoutRequiredSkillInputSchema: z.ZodType<Prisma.JobApplicationUncheckedCreateWithoutRequiredSkillInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  company: z.string(),
  location: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => JobApplicationStatusSchema).optional(),
  sourceName: z.string().optional().nullable(),
  sourceUrl: z.string().optional().nullable(),
  userId: z.string(),
  resumeUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  order: z.number().int().optional(),
  jobApplicationStatusHistory: z.lazy(() => JobApplicationStatusHistoryUncheckedCreateNestedManyWithoutJobApplicationInputSchema).optional(),
  reminders: z.lazy(() => ReminderUncheckedCreateNestedManyWithoutJobApplicationInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutJobApplicationsInputSchema).optional(),
});

export const JobApplicationCreateOrConnectWithoutRequiredSkillInputSchema: z.ZodType<Prisma.JobApplicationCreateOrConnectWithoutRequiredSkillInput> = z.strictObject({
  where: z.lazy(() => JobApplicationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutRequiredSkillInputSchema), z.lazy(() => JobApplicationUncheckedCreateWithoutRequiredSkillInputSchema) ]),
});

export const JobApplicationUpsertWithoutRequiredSkillInputSchema: z.ZodType<Prisma.JobApplicationUpsertWithoutRequiredSkillInput> = z.strictObject({
  update: z.union([ z.lazy(() => JobApplicationUpdateWithoutRequiredSkillInputSchema), z.lazy(() => JobApplicationUncheckedUpdateWithoutRequiredSkillInputSchema) ]),
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutRequiredSkillInputSchema), z.lazy(() => JobApplicationUncheckedCreateWithoutRequiredSkillInputSchema) ]),
  where: z.lazy(() => JobApplicationWhereInputSchema).optional(),
});

export const JobApplicationUpdateToOneWithWhereWithoutRequiredSkillInputSchema: z.ZodType<Prisma.JobApplicationUpdateToOneWithWhereWithoutRequiredSkillInput> = z.strictObject({
  where: z.lazy(() => JobApplicationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => JobApplicationUpdateWithoutRequiredSkillInputSchema), z.lazy(() => JobApplicationUncheckedUpdateWithoutRequiredSkillInputSchema) ]),
});

export const JobApplicationUpdateWithoutRequiredSkillInputSchema: z.ZodType<Prisma.JobApplicationUpdateWithoutRequiredSkillInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  sourceName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sourceUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  resumeUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutJobApplicationsNestedInputSchema).optional(),
  jobApplicationStatusHistory: z.lazy(() => JobApplicationStatusHistoryUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
  reminders: z.lazy(() => ReminderUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
  tags: z.lazy(() => TagUpdateManyWithoutJobApplicationsNestedInputSchema).optional(),
});

export const JobApplicationUncheckedUpdateWithoutRequiredSkillInputSchema: z.ZodType<Prisma.JobApplicationUncheckedUpdateWithoutRequiredSkillInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  sourceName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sourceUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resumeUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  jobApplicationStatusHistory: z.lazy(() => JobApplicationStatusHistoryUncheckedUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
  reminders: z.lazy(() => ReminderUncheckedUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedUpdateManyWithoutJobApplicationsNestedInputSchema).optional(),
});

export const JobApplicationCreateWithoutJobApplicationStatusHistoryInputSchema: z.ZodType<Prisma.JobApplicationCreateWithoutJobApplicationStatusHistoryInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  company: z.string(),
  location: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => JobApplicationStatusSchema).optional(),
  sourceName: z.string().optional().nullable(),
  sourceUrl: z.string().optional().nullable(),
  resumeUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  order: z.number().int().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutJobApplicationsInputSchema),
  requiredSkill: z.lazy(() => RequiredSkillCreateNestedManyWithoutJobApplicationInputSchema).optional(),
  reminders: z.lazy(() => ReminderCreateNestedManyWithoutJobApplicationInputSchema).optional(),
  tags: z.lazy(() => TagCreateNestedManyWithoutJobApplicationsInputSchema).optional(),
});

export const JobApplicationUncheckedCreateWithoutJobApplicationStatusHistoryInputSchema: z.ZodType<Prisma.JobApplicationUncheckedCreateWithoutJobApplicationStatusHistoryInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  company: z.string(),
  location: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => JobApplicationStatusSchema).optional(),
  sourceName: z.string().optional().nullable(),
  sourceUrl: z.string().optional().nullable(),
  userId: z.string(),
  resumeUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  order: z.number().int().optional(),
  requiredSkill: z.lazy(() => RequiredSkillUncheckedCreateNestedManyWithoutJobApplicationInputSchema).optional(),
  reminders: z.lazy(() => ReminderUncheckedCreateNestedManyWithoutJobApplicationInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutJobApplicationsInputSchema).optional(),
});

export const JobApplicationCreateOrConnectWithoutJobApplicationStatusHistoryInputSchema: z.ZodType<Prisma.JobApplicationCreateOrConnectWithoutJobApplicationStatusHistoryInput> = z.strictObject({
  where: z.lazy(() => JobApplicationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutJobApplicationStatusHistoryInputSchema), z.lazy(() => JobApplicationUncheckedCreateWithoutJobApplicationStatusHistoryInputSchema) ]),
});

export const JobApplicationUpsertWithoutJobApplicationStatusHistoryInputSchema: z.ZodType<Prisma.JobApplicationUpsertWithoutJobApplicationStatusHistoryInput> = z.strictObject({
  update: z.union([ z.lazy(() => JobApplicationUpdateWithoutJobApplicationStatusHistoryInputSchema), z.lazy(() => JobApplicationUncheckedUpdateWithoutJobApplicationStatusHistoryInputSchema) ]),
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutJobApplicationStatusHistoryInputSchema), z.lazy(() => JobApplicationUncheckedCreateWithoutJobApplicationStatusHistoryInputSchema) ]),
  where: z.lazy(() => JobApplicationWhereInputSchema).optional(),
});

export const JobApplicationUpdateToOneWithWhereWithoutJobApplicationStatusHistoryInputSchema: z.ZodType<Prisma.JobApplicationUpdateToOneWithWhereWithoutJobApplicationStatusHistoryInput> = z.strictObject({
  where: z.lazy(() => JobApplicationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => JobApplicationUpdateWithoutJobApplicationStatusHistoryInputSchema), z.lazy(() => JobApplicationUncheckedUpdateWithoutJobApplicationStatusHistoryInputSchema) ]),
});

export const JobApplicationUpdateWithoutJobApplicationStatusHistoryInputSchema: z.ZodType<Prisma.JobApplicationUpdateWithoutJobApplicationStatusHistoryInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  sourceName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sourceUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  resumeUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutJobApplicationsNestedInputSchema).optional(),
  requiredSkill: z.lazy(() => RequiredSkillUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
  reminders: z.lazy(() => ReminderUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
  tags: z.lazy(() => TagUpdateManyWithoutJobApplicationsNestedInputSchema).optional(),
});

export const JobApplicationUncheckedUpdateWithoutJobApplicationStatusHistoryInputSchema: z.ZodType<Prisma.JobApplicationUncheckedUpdateWithoutJobApplicationStatusHistoryInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  sourceName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sourceUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resumeUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  requiredSkill: z.lazy(() => RequiredSkillUncheckedUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
  reminders: z.lazy(() => ReminderUncheckedUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedUpdateManyWithoutJobApplicationsNestedInputSchema).optional(),
});

export const JobApplicationCreateWithoutRemindersInputSchema: z.ZodType<Prisma.JobApplicationCreateWithoutRemindersInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  company: z.string(),
  location: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => JobApplicationStatusSchema).optional(),
  sourceName: z.string().optional().nullable(),
  sourceUrl: z.string().optional().nullable(),
  resumeUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  order: z.number().int().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutJobApplicationsInputSchema),
  requiredSkill: z.lazy(() => RequiredSkillCreateNestedManyWithoutJobApplicationInputSchema).optional(),
  jobApplicationStatusHistory: z.lazy(() => JobApplicationStatusHistoryCreateNestedManyWithoutJobApplicationInputSchema).optional(),
  tags: z.lazy(() => TagCreateNestedManyWithoutJobApplicationsInputSchema).optional(),
});

export const JobApplicationUncheckedCreateWithoutRemindersInputSchema: z.ZodType<Prisma.JobApplicationUncheckedCreateWithoutRemindersInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  company: z.string(),
  location: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => JobApplicationStatusSchema).optional(),
  sourceName: z.string().optional().nullable(),
  sourceUrl: z.string().optional().nullable(),
  userId: z.string(),
  resumeUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  order: z.number().int().optional(),
  requiredSkill: z.lazy(() => RequiredSkillUncheckedCreateNestedManyWithoutJobApplicationInputSchema).optional(),
  jobApplicationStatusHistory: z.lazy(() => JobApplicationStatusHistoryUncheckedCreateNestedManyWithoutJobApplicationInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutJobApplicationsInputSchema).optional(),
});

export const JobApplicationCreateOrConnectWithoutRemindersInputSchema: z.ZodType<Prisma.JobApplicationCreateOrConnectWithoutRemindersInput> = z.strictObject({
  where: z.lazy(() => JobApplicationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutRemindersInputSchema), z.lazy(() => JobApplicationUncheckedCreateWithoutRemindersInputSchema) ]),
});

export const JobApplicationUpsertWithoutRemindersInputSchema: z.ZodType<Prisma.JobApplicationUpsertWithoutRemindersInput> = z.strictObject({
  update: z.union([ z.lazy(() => JobApplicationUpdateWithoutRemindersInputSchema), z.lazy(() => JobApplicationUncheckedUpdateWithoutRemindersInputSchema) ]),
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutRemindersInputSchema), z.lazy(() => JobApplicationUncheckedCreateWithoutRemindersInputSchema) ]),
  where: z.lazy(() => JobApplicationWhereInputSchema).optional(),
});

export const JobApplicationUpdateToOneWithWhereWithoutRemindersInputSchema: z.ZodType<Prisma.JobApplicationUpdateToOneWithWhereWithoutRemindersInput> = z.strictObject({
  where: z.lazy(() => JobApplicationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => JobApplicationUpdateWithoutRemindersInputSchema), z.lazy(() => JobApplicationUncheckedUpdateWithoutRemindersInputSchema) ]),
});

export const JobApplicationUpdateWithoutRemindersInputSchema: z.ZodType<Prisma.JobApplicationUpdateWithoutRemindersInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  sourceName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sourceUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  resumeUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutJobApplicationsNestedInputSchema).optional(),
  requiredSkill: z.lazy(() => RequiredSkillUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
  jobApplicationStatusHistory: z.lazy(() => JobApplicationStatusHistoryUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
  tags: z.lazy(() => TagUpdateManyWithoutJobApplicationsNestedInputSchema).optional(),
});

export const JobApplicationUncheckedUpdateWithoutRemindersInputSchema: z.ZodType<Prisma.JobApplicationUncheckedUpdateWithoutRemindersInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  sourceName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sourceUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resumeUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  requiredSkill: z.lazy(() => RequiredSkillUncheckedUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
  jobApplicationStatusHistory: z.lazy(() => JobApplicationStatusHistoryUncheckedUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedUpdateManyWithoutJobApplicationsNestedInputSchema).optional(),
});

export const UserCreateWithoutAvailableTagsInputSchema: z.ZodType<Prisma.UserCreateWithoutAvailableTagsInput> = z.strictObject({
  id: z.uuid().optional(),
  firebaseUid: z.string(),
  field: z.string().optional().nullable(),
  profession: z.string().optional().nullable(),
  email: z.string(),
  name: z.string().optional().nullable(),
  photoUrl: z.string().optional().nullable(),
  provider: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  jobApplications: z.lazy(() => JobApplicationCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutAvailableTagsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAvailableTagsInput> = z.strictObject({
  id: z.uuid().optional(),
  firebaseUid: z.string(),
  field: z.string().optional().nullable(),
  profession: z.string().optional().nullable(),
  email: z.string(),
  name: z.string().optional().nullable(),
  photoUrl: z.string().optional().nullable(),
  provider: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  jobApplications: z.lazy(() => JobApplicationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutAvailableTagsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAvailableTagsInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAvailableTagsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAvailableTagsInputSchema) ]),
});

export const JobApplicationCreateWithoutTagsInputSchema: z.ZodType<Prisma.JobApplicationCreateWithoutTagsInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  company: z.string(),
  location: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => JobApplicationStatusSchema).optional(),
  sourceName: z.string().optional().nullable(),
  sourceUrl: z.string().optional().nullable(),
  resumeUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  order: z.number().int().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutJobApplicationsInputSchema),
  requiredSkill: z.lazy(() => RequiredSkillCreateNestedManyWithoutJobApplicationInputSchema).optional(),
  jobApplicationStatusHistory: z.lazy(() => JobApplicationStatusHistoryCreateNestedManyWithoutJobApplicationInputSchema).optional(),
  reminders: z.lazy(() => ReminderCreateNestedManyWithoutJobApplicationInputSchema).optional(),
});

export const JobApplicationUncheckedCreateWithoutTagsInputSchema: z.ZodType<Prisma.JobApplicationUncheckedCreateWithoutTagsInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  company: z.string(),
  location: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => JobApplicationStatusSchema).optional(),
  sourceName: z.string().optional().nullable(),
  sourceUrl: z.string().optional().nullable(),
  userId: z.string(),
  resumeUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  order: z.number().int().optional(),
  requiredSkill: z.lazy(() => RequiredSkillUncheckedCreateNestedManyWithoutJobApplicationInputSchema).optional(),
  jobApplicationStatusHistory: z.lazy(() => JobApplicationStatusHistoryUncheckedCreateNestedManyWithoutJobApplicationInputSchema).optional(),
  reminders: z.lazy(() => ReminderUncheckedCreateNestedManyWithoutJobApplicationInputSchema).optional(),
});

export const JobApplicationCreateOrConnectWithoutTagsInputSchema: z.ZodType<Prisma.JobApplicationCreateOrConnectWithoutTagsInput> = z.strictObject({
  where: z.lazy(() => JobApplicationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutTagsInputSchema), z.lazy(() => JobApplicationUncheckedCreateWithoutTagsInputSchema) ]),
});

export const UserUpsertWithoutAvailableTagsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAvailableTagsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutAvailableTagsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAvailableTagsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAvailableTagsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAvailableTagsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutAvailableTagsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAvailableTagsInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAvailableTagsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAvailableTagsInputSchema) ]),
});

export const UserUpdateWithoutAvailableTagsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAvailableTagsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firebaseUid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  field: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profession: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  jobApplications: z.lazy(() => JobApplicationUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutAvailableTagsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAvailableTagsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firebaseUid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  field: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profession: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  jobApplications: z.lazy(() => JobApplicationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const JobApplicationUpsertWithWhereUniqueWithoutTagsInputSchema: z.ZodType<Prisma.JobApplicationUpsertWithWhereUniqueWithoutTagsInput> = z.strictObject({
  where: z.lazy(() => JobApplicationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => JobApplicationUpdateWithoutTagsInputSchema), z.lazy(() => JobApplicationUncheckedUpdateWithoutTagsInputSchema) ]),
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutTagsInputSchema), z.lazy(() => JobApplicationUncheckedCreateWithoutTagsInputSchema) ]),
});

export const JobApplicationUpdateWithWhereUniqueWithoutTagsInputSchema: z.ZodType<Prisma.JobApplicationUpdateWithWhereUniqueWithoutTagsInput> = z.strictObject({
  where: z.lazy(() => JobApplicationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => JobApplicationUpdateWithoutTagsInputSchema), z.lazy(() => JobApplicationUncheckedUpdateWithoutTagsInputSchema) ]),
});

export const JobApplicationUpdateManyWithWhereWithoutTagsInputSchema: z.ZodType<Prisma.JobApplicationUpdateManyWithWhereWithoutTagsInput> = z.strictObject({
  where: z.lazy(() => JobApplicationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => JobApplicationUpdateManyMutationInputSchema), z.lazy(() => JobApplicationUncheckedUpdateManyWithoutTagsInputSchema) ]),
});

export const UserCreateWithoutJobApplicationsInputSchema: z.ZodType<Prisma.UserCreateWithoutJobApplicationsInput> = z.strictObject({
  id: z.uuid().optional(),
  firebaseUid: z.string(),
  field: z.string().optional().nullable(),
  profession: z.string().optional().nullable(),
  email: z.string(),
  name: z.string().optional().nullable(),
  photoUrl: z.string().optional().nullable(),
  provider: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  availableTags: z.lazy(() => TagCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutJobApplicationsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutJobApplicationsInput> = z.strictObject({
  id: z.uuid().optional(),
  firebaseUid: z.string(),
  field: z.string().optional().nullable(),
  profession: z.string().optional().nullable(),
  email: z.string(),
  name: z.string().optional().nullable(),
  photoUrl: z.string().optional().nullable(),
  provider: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  availableTags: z.lazy(() => TagUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutJobApplicationsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutJobApplicationsInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutJobApplicationsInputSchema), z.lazy(() => UserUncheckedCreateWithoutJobApplicationsInputSchema) ]),
});

export const RequiredSkillCreateWithoutJobApplicationInputSchema: z.ZodType<Prisma.RequiredSkillCreateWithoutJobApplicationInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  yearsOfExperienceNeeded: z.number().int().optional().nullable(),
  yearsOfExperienceHave: z.number().int().optional().nullable(),
  isOptional: z.boolean().optional(),
  isRequirementMet: z.boolean().optional(),
});

export const RequiredSkillUncheckedCreateWithoutJobApplicationInputSchema: z.ZodType<Prisma.RequiredSkillUncheckedCreateWithoutJobApplicationInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  yearsOfExperienceNeeded: z.number().int().optional().nullable(),
  yearsOfExperienceHave: z.number().int().optional().nullable(),
  isOptional: z.boolean().optional(),
  isRequirementMet: z.boolean().optional(),
});

export const RequiredSkillCreateOrConnectWithoutJobApplicationInputSchema: z.ZodType<Prisma.RequiredSkillCreateOrConnectWithoutJobApplicationInput> = z.strictObject({
  where: z.lazy(() => RequiredSkillWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RequiredSkillCreateWithoutJobApplicationInputSchema), z.lazy(() => RequiredSkillUncheckedCreateWithoutJobApplicationInputSchema) ]),
});

export const RequiredSkillCreateManyJobApplicationInputEnvelopeSchema: z.ZodType<Prisma.RequiredSkillCreateManyJobApplicationInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => RequiredSkillCreateManyJobApplicationInputSchema), z.lazy(() => RequiredSkillCreateManyJobApplicationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const JobApplicationStatusHistoryCreateWithoutJobApplicationInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryCreateWithoutJobApplicationInput> = z.strictObject({
  id: z.uuid().optional(),
  oldStatus: z.lazy(() => JobApplicationStatusSchema),
  newStatus: z.lazy(() => JobApplicationStatusSchema),
  changedAt: z.coerce.date().optional(),
});

export const JobApplicationStatusHistoryUncheckedCreateWithoutJobApplicationInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryUncheckedCreateWithoutJobApplicationInput> = z.strictObject({
  id: z.uuid().optional(),
  oldStatus: z.lazy(() => JobApplicationStatusSchema),
  newStatus: z.lazy(() => JobApplicationStatusSchema),
  changedAt: z.coerce.date().optional(),
});

export const JobApplicationStatusHistoryCreateOrConnectWithoutJobApplicationInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryCreateOrConnectWithoutJobApplicationInput> = z.strictObject({
  where: z.lazy(() => JobApplicationStatusHistoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => JobApplicationStatusHistoryCreateWithoutJobApplicationInputSchema), z.lazy(() => JobApplicationStatusHistoryUncheckedCreateWithoutJobApplicationInputSchema) ]),
});

export const JobApplicationStatusHistoryCreateManyJobApplicationInputEnvelopeSchema: z.ZodType<Prisma.JobApplicationStatusHistoryCreateManyJobApplicationInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => JobApplicationStatusHistoryCreateManyJobApplicationInputSchema), z.lazy(() => JobApplicationStatusHistoryCreateManyJobApplicationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const ReminderCreateWithoutJobApplicationInputSchema: z.ZodType<Prisma.ReminderCreateWithoutJobApplicationInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  reminderDate: z.coerce.date(),
  remindAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const ReminderUncheckedCreateWithoutJobApplicationInputSchema: z.ZodType<Prisma.ReminderUncheckedCreateWithoutJobApplicationInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  reminderDate: z.coerce.date(),
  remindAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const ReminderCreateOrConnectWithoutJobApplicationInputSchema: z.ZodType<Prisma.ReminderCreateOrConnectWithoutJobApplicationInput> = z.strictObject({
  where: z.lazy(() => ReminderWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReminderCreateWithoutJobApplicationInputSchema), z.lazy(() => ReminderUncheckedCreateWithoutJobApplicationInputSchema) ]),
});

export const ReminderCreateManyJobApplicationInputEnvelopeSchema: z.ZodType<Prisma.ReminderCreateManyJobApplicationInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => ReminderCreateManyJobApplicationInputSchema), z.lazy(() => ReminderCreateManyJobApplicationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const TagCreateWithoutJobApplicationsInputSchema: z.ZodType<Prisma.TagCreateWithoutJobApplicationsInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  color: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAvailableTagsInputSchema),
});

export const TagUncheckedCreateWithoutJobApplicationsInputSchema: z.ZodType<Prisma.TagUncheckedCreateWithoutJobApplicationsInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  color: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
});

export const TagCreateOrConnectWithoutJobApplicationsInputSchema: z.ZodType<Prisma.TagCreateOrConnectWithoutJobApplicationsInput> = z.strictObject({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TagCreateWithoutJobApplicationsInputSchema), z.lazy(() => TagUncheckedCreateWithoutJobApplicationsInputSchema) ]),
});

export const UserUpsertWithoutJobApplicationsInputSchema: z.ZodType<Prisma.UserUpsertWithoutJobApplicationsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutJobApplicationsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutJobApplicationsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutJobApplicationsInputSchema), z.lazy(() => UserUncheckedCreateWithoutJobApplicationsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutJobApplicationsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutJobApplicationsInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutJobApplicationsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutJobApplicationsInputSchema) ]),
});

export const UserUpdateWithoutJobApplicationsInputSchema: z.ZodType<Prisma.UserUpdateWithoutJobApplicationsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firebaseUid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  field: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profession: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  availableTags: z.lazy(() => TagUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutJobApplicationsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutJobApplicationsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firebaseUid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  field: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profession: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  availableTags: z.lazy(() => TagUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const RequiredSkillUpsertWithWhereUniqueWithoutJobApplicationInputSchema: z.ZodType<Prisma.RequiredSkillUpsertWithWhereUniqueWithoutJobApplicationInput> = z.strictObject({
  where: z.lazy(() => RequiredSkillWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RequiredSkillUpdateWithoutJobApplicationInputSchema), z.lazy(() => RequiredSkillUncheckedUpdateWithoutJobApplicationInputSchema) ]),
  create: z.union([ z.lazy(() => RequiredSkillCreateWithoutJobApplicationInputSchema), z.lazy(() => RequiredSkillUncheckedCreateWithoutJobApplicationInputSchema) ]),
});

export const RequiredSkillUpdateWithWhereUniqueWithoutJobApplicationInputSchema: z.ZodType<Prisma.RequiredSkillUpdateWithWhereUniqueWithoutJobApplicationInput> = z.strictObject({
  where: z.lazy(() => RequiredSkillWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RequiredSkillUpdateWithoutJobApplicationInputSchema), z.lazy(() => RequiredSkillUncheckedUpdateWithoutJobApplicationInputSchema) ]),
});

export const RequiredSkillUpdateManyWithWhereWithoutJobApplicationInputSchema: z.ZodType<Prisma.RequiredSkillUpdateManyWithWhereWithoutJobApplicationInput> = z.strictObject({
  where: z.lazy(() => RequiredSkillScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RequiredSkillUpdateManyMutationInputSchema), z.lazy(() => RequiredSkillUncheckedUpdateManyWithoutJobApplicationInputSchema) ]),
});

export const RequiredSkillScalarWhereInputSchema: z.ZodType<Prisma.RequiredSkillScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => RequiredSkillScalarWhereInputSchema), z.lazy(() => RequiredSkillScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RequiredSkillScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RequiredSkillScalarWhereInputSchema), z.lazy(() => RequiredSkillScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  yearsOfExperienceNeeded: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  yearsOfExperienceHave: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  jobApplicationId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  isOptional: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  isRequirementMet: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
});

export const JobApplicationStatusHistoryUpsertWithWhereUniqueWithoutJobApplicationInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryUpsertWithWhereUniqueWithoutJobApplicationInput> = z.strictObject({
  where: z.lazy(() => JobApplicationStatusHistoryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => JobApplicationStatusHistoryUpdateWithoutJobApplicationInputSchema), z.lazy(() => JobApplicationStatusHistoryUncheckedUpdateWithoutJobApplicationInputSchema) ]),
  create: z.union([ z.lazy(() => JobApplicationStatusHistoryCreateWithoutJobApplicationInputSchema), z.lazy(() => JobApplicationStatusHistoryUncheckedCreateWithoutJobApplicationInputSchema) ]),
});

export const JobApplicationStatusHistoryUpdateWithWhereUniqueWithoutJobApplicationInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryUpdateWithWhereUniqueWithoutJobApplicationInput> = z.strictObject({
  where: z.lazy(() => JobApplicationStatusHistoryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => JobApplicationStatusHistoryUpdateWithoutJobApplicationInputSchema), z.lazy(() => JobApplicationStatusHistoryUncheckedUpdateWithoutJobApplicationInputSchema) ]),
});

export const JobApplicationStatusHistoryUpdateManyWithWhereWithoutJobApplicationInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryUpdateManyWithWhereWithoutJobApplicationInput> = z.strictObject({
  where: z.lazy(() => JobApplicationStatusHistoryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => JobApplicationStatusHistoryUpdateManyMutationInputSchema), z.lazy(() => JobApplicationStatusHistoryUncheckedUpdateManyWithoutJobApplicationInputSchema) ]),
});

export const JobApplicationStatusHistoryScalarWhereInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => JobApplicationStatusHistoryScalarWhereInputSchema), z.lazy(() => JobApplicationStatusHistoryScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobApplicationStatusHistoryScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobApplicationStatusHistoryScalarWhereInputSchema), z.lazy(() => JobApplicationStatusHistoryScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  jobApplicationId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  oldStatus: z.union([ z.lazy(() => EnumJobApplicationStatusFilterSchema), z.lazy(() => JobApplicationStatusSchema) ]).optional(),
  newStatus: z.union([ z.lazy(() => EnumJobApplicationStatusFilterSchema), z.lazy(() => JobApplicationStatusSchema) ]).optional(),
  changedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const ReminderUpsertWithWhereUniqueWithoutJobApplicationInputSchema: z.ZodType<Prisma.ReminderUpsertWithWhereUniqueWithoutJobApplicationInput> = z.strictObject({
  where: z.lazy(() => ReminderWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReminderUpdateWithoutJobApplicationInputSchema), z.lazy(() => ReminderUncheckedUpdateWithoutJobApplicationInputSchema) ]),
  create: z.union([ z.lazy(() => ReminderCreateWithoutJobApplicationInputSchema), z.lazy(() => ReminderUncheckedCreateWithoutJobApplicationInputSchema) ]),
});

export const ReminderUpdateWithWhereUniqueWithoutJobApplicationInputSchema: z.ZodType<Prisma.ReminderUpdateWithWhereUniqueWithoutJobApplicationInput> = z.strictObject({
  where: z.lazy(() => ReminderWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReminderUpdateWithoutJobApplicationInputSchema), z.lazy(() => ReminderUncheckedUpdateWithoutJobApplicationInputSchema) ]),
});

export const ReminderUpdateManyWithWhereWithoutJobApplicationInputSchema: z.ZodType<Prisma.ReminderUpdateManyWithWhereWithoutJobApplicationInput> = z.strictObject({
  where: z.lazy(() => ReminderScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReminderUpdateManyMutationInputSchema), z.lazy(() => ReminderUncheckedUpdateManyWithoutJobApplicationInputSchema) ]),
});

export const ReminderScalarWhereInputSchema: z.ZodType<Prisma.ReminderScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ReminderScalarWhereInputSchema), z.lazy(() => ReminderScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReminderScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReminderScalarWhereInputSchema), z.lazy(() => ReminderScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  jobApplicationId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  reminderDate: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  remindAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const TagUpsertWithWhereUniqueWithoutJobApplicationsInputSchema: z.ZodType<Prisma.TagUpsertWithWhereUniqueWithoutJobApplicationsInput> = z.strictObject({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TagUpdateWithoutJobApplicationsInputSchema), z.lazy(() => TagUncheckedUpdateWithoutJobApplicationsInputSchema) ]),
  create: z.union([ z.lazy(() => TagCreateWithoutJobApplicationsInputSchema), z.lazy(() => TagUncheckedCreateWithoutJobApplicationsInputSchema) ]),
});

export const TagUpdateWithWhereUniqueWithoutJobApplicationsInputSchema: z.ZodType<Prisma.TagUpdateWithWhereUniqueWithoutJobApplicationsInput> = z.strictObject({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TagUpdateWithoutJobApplicationsInputSchema), z.lazy(() => TagUncheckedUpdateWithoutJobApplicationsInputSchema) ]),
});

export const TagUpdateManyWithWhereWithoutJobApplicationsInputSchema: z.ZodType<Prisma.TagUpdateManyWithWhereWithoutJobApplicationsInput> = z.strictObject({
  where: z.lazy(() => TagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TagUpdateManyMutationInputSchema), z.lazy(() => TagUncheckedUpdateManyWithoutJobApplicationsInputSchema) ]),
});

export const JobApplicationCreateManyUserInputSchema: z.ZodType<Prisma.JobApplicationCreateManyUserInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  company: z.string(),
  location: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => JobApplicationStatusSchema).optional(),
  sourceName: z.string().optional().nullable(),
  sourceUrl: z.string().optional().nullable(),
  resumeUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  order: z.number().int().optional(),
});

export const TagCreateManyUserInputSchema: z.ZodType<Prisma.TagCreateManyUserInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  color: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const JobApplicationUpdateWithoutUserInputSchema: z.ZodType<Prisma.JobApplicationUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  sourceName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sourceUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  resumeUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  requiredSkill: z.lazy(() => RequiredSkillUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
  jobApplicationStatusHistory: z.lazy(() => JobApplicationStatusHistoryUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
  reminders: z.lazy(() => ReminderUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
  tags: z.lazy(() => TagUpdateManyWithoutJobApplicationsNestedInputSchema).optional(),
});

export const JobApplicationUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.JobApplicationUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  sourceName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sourceUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  resumeUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  requiredSkill: z.lazy(() => RequiredSkillUncheckedUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
  jobApplicationStatusHistory: z.lazy(() => JobApplicationStatusHistoryUncheckedUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
  reminders: z.lazy(() => ReminderUncheckedUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedUpdateManyWithoutJobApplicationsNestedInputSchema).optional(),
});

export const JobApplicationUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.JobApplicationUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  sourceName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sourceUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  resumeUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TagUpdateWithoutUserInputSchema: z.ZodType<Prisma.TagUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  jobApplications: z.lazy(() => JobApplicationUpdateManyWithoutTagsNestedInputSchema).optional(),
});

export const TagUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.TagUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  jobApplications: z.lazy(() => JobApplicationUncheckedUpdateManyWithoutTagsNestedInputSchema).optional(),
});

export const TagUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const JobApplicationUpdateWithoutTagsInputSchema: z.ZodType<Prisma.JobApplicationUpdateWithoutTagsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  sourceName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sourceUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  resumeUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutJobApplicationsNestedInputSchema).optional(),
  requiredSkill: z.lazy(() => RequiredSkillUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
  jobApplicationStatusHistory: z.lazy(() => JobApplicationStatusHistoryUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
  reminders: z.lazy(() => ReminderUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
});

export const JobApplicationUncheckedUpdateWithoutTagsInputSchema: z.ZodType<Prisma.JobApplicationUncheckedUpdateWithoutTagsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  sourceName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sourceUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resumeUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  requiredSkill: z.lazy(() => RequiredSkillUncheckedUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
  jobApplicationStatusHistory: z.lazy(() => JobApplicationStatusHistoryUncheckedUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
  reminders: z.lazy(() => ReminderUncheckedUpdateManyWithoutJobApplicationNestedInputSchema).optional(),
});

export const JobApplicationUncheckedUpdateManyWithoutTagsInputSchema: z.ZodType<Prisma.JobApplicationUncheckedUpdateManyWithoutTagsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  sourceName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sourceUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resumeUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const RequiredSkillCreateManyJobApplicationInputSchema: z.ZodType<Prisma.RequiredSkillCreateManyJobApplicationInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  yearsOfExperienceNeeded: z.number().int().optional().nullable(),
  yearsOfExperienceHave: z.number().int().optional().nullable(),
  isOptional: z.boolean().optional(),
  isRequirementMet: z.boolean().optional(),
});

export const JobApplicationStatusHistoryCreateManyJobApplicationInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryCreateManyJobApplicationInput> = z.strictObject({
  id: z.uuid().optional(),
  oldStatus: z.lazy(() => JobApplicationStatusSchema),
  newStatus: z.lazy(() => JobApplicationStatusSchema),
  changedAt: z.coerce.date().optional(),
});

export const ReminderCreateManyJobApplicationInputSchema: z.ZodType<Prisma.ReminderCreateManyJobApplicationInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  reminderDate: z.coerce.date(),
  remindAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const RequiredSkillUpdateWithoutJobApplicationInputSchema: z.ZodType<Prisma.RequiredSkillUpdateWithoutJobApplicationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  yearsOfExperienceNeeded: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  yearsOfExperienceHave: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isOptional: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isRequirementMet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const RequiredSkillUncheckedUpdateWithoutJobApplicationInputSchema: z.ZodType<Prisma.RequiredSkillUncheckedUpdateWithoutJobApplicationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  yearsOfExperienceNeeded: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  yearsOfExperienceHave: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isOptional: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isRequirementMet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const RequiredSkillUncheckedUpdateManyWithoutJobApplicationInputSchema: z.ZodType<Prisma.RequiredSkillUncheckedUpdateManyWithoutJobApplicationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  yearsOfExperienceNeeded: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  yearsOfExperienceHave: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isOptional: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isRequirementMet: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const JobApplicationStatusHistoryUpdateWithoutJobApplicationInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryUpdateWithoutJobApplicationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  oldStatus: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  newStatus: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  changedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const JobApplicationStatusHistoryUncheckedUpdateWithoutJobApplicationInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryUncheckedUpdateWithoutJobApplicationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  oldStatus: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  newStatus: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  changedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const JobApplicationStatusHistoryUncheckedUpdateManyWithoutJobApplicationInputSchema: z.ZodType<Prisma.JobApplicationStatusHistoryUncheckedUpdateManyWithoutJobApplicationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  oldStatus: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  newStatus: z.union([ z.lazy(() => JobApplicationStatusSchema), z.lazy(() => EnumJobApplicationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  changedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ReminderUpdateWithoutJobApplicationInputSchema: z.ZodType<Prisma.ReminderUpdateWithoutJobApplicationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reminderDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  remindAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ReminderUncheckedUpdateWithoutJobApplicationInputSchema: z.ZodType<Prisma.ReminderUncheckedUpdateWithoutJobApplicationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reminderDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  remindAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ReminderUncheckedUpdateManyWithoutJobApplicationInputSchema: z.ZodType<Prisma.ReminderUncheckedUpdateManyWithoutJobApplicationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reminderDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  remindAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TagUpdateWithoutJobApplicationsInputSchema: z.ZodType<Prisma.TagUpdateWithoutJobApplicationsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAvailableTagsNestedInputSchema).optional(),
});

export const TagUncheckedUpdateWithoutJobApplicationsInputSchema: z.ZodType<Prisma.TagUncheckedUpdateWithoutJobApplicationsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TagUncheckedUpdateManyWithoutJobApplicationsInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyWithoutJobApplicationsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(), UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(), 
  having: UserScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const RequiredSkillFindFirstArgsSchema: z.ZodType<Prisma.RequiredSkillFindFirstArgs> = z.object({
  select: RequiredSkillSelectSchema.optional(),
  include: RequiredSkillIncludeSchema.optional(),
  where: RequiredSkillWhereInputSchema.optional(), 
  orderBy: z.union([ RequiredSkillOrderByWithRelationInputSchema.array(), RequiredSkillOrderByWithRelationInputSchema ]).optional(),
  cursor: RequiredSkillWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RequiredSkillScalarFieldEnumSchema, RequiredSkillScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const RequiredSkillFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RequiredSkillFindFirstOrThrowArgs> = z.object({
  select: RequiredSkillSelectSchema.optional(),
  include: RequiredSkillIncludeSchema.optional(),
  where: RequiredSkillWhereInputSchema.optional(), 
  orderBy: z.union([ RequiredSkillOrderByWithRelationInputSchema.array(), RequiredSkillOrderByWithRelationInputSchema ]).optional(),
  cursor: RequiredSkillWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RequiredSkillScalarFieldEnumSchema, RequiredSkillScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const RequiredSkillFindManyArgsSchema: z.ZodType<Prisma.RequiredSkillFindManyArgs> = z.object({
  select: RequiredSkillSelectSchema.optional(),
  include: RequiredSkillIncludeSchema.optional(),
  where: RequiredSkillWhereInputSchema.optional(), 
  orderBy: z.union([ RequiredSkillOrderByWithRelationInputSchema.array(), RequiredSkillOrderByWithRelationInputSchema ]).optional(),
  cursor: RequiredSkillWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RequiredSkillScalarFieldEnumSchema, RequiredSkillScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const RequiredSkillAggregateArgsSchema: z.ZodType<Prisma.RequiredSkillAggregateArgs> = z.object({
  where: RequiredSkillWhereInputSchema.optional(), 
  orderBy: z.union([ RequiredSkillOrderByWithRelationInputSchema.array(), RequiredSkillOrderByWithRelationInputSchema ]).optional(),
  cursor: RequiredSkillWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const RequiredSkillGroupByArgsSchema: z.ZodType<Prisma.RequiredSkillGroupByArgs> = z.object({
  where: RequiredSkillWhereInputSchema.optional(), 
  orderBy: z.union([ RequiredSkillOrderByWithAggregationInputSchema.array(), RequiredSkillOrderByWithAggregationInputSchema ]).optional(),
  by: RequiredSkillScalarFieldEnumSchema.array(), 
  having: RequiredSkillScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const RequiredSkillFindUniqueArgsSchema: z.ZodType<Prisma.RequiredSkillFindUniqueArgs> = z.object({
  select: RequiredSkillSelectSchema.optional(),
  include: RequiredSkillIncludeSchema.optional(),
  where: RequiredSkillWhereUniqueInputSchema, 
}).strict();

export const RequiredSkillFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RequiredSkillFindUniqueOrThrowArgs> = z.object({
  select: RequiredSkillSelectSchema.optional(),
  include: RequiredSkillIncludeSchema.optional(),
  where: RequiredSkillWhereUniqueInputSchema, 
}).strict();

export const JobApplicationStatusHistoryFindFirstArgsSchema: z.ZodType<Prisma.JobApplicationStatusHistoryFindFirstArgs> = z.object({
  select: JobApplicationStatusHistorySelectSchema.optional(),
  include: JobApplicationStatusHistoryIncludeSchema.optional(),
  where: JobApplicationStatusHistoryWhereInputSchema.optional(), 
  orderBy: z.union([ JobApplicationStatusHistoryOrderByWithRelationInputSchema.array(), JobApplicationStatusHistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: JobApplicationStatusHistoryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ JobApplicationStatusHistoryScalarFieldEnumSchema, JobApplicationStatusHistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const JobApplicationStatusHistoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.JobApplicationStatusHistoryFindFirstOrThrowArgs> = z.object({
  select: JobApplicationStatusHistorySelectSchema.optional(),
  include: JobApplicationStatusHistoryIncludeSchema.optional(),
  where: JobApplicationStatusHistoryWhereInputSchema.optional(), 
  orderBy: z.union([ JobApplicationStatusHistoryOrderByWithRelationInputSchema.array(), JobApplicationStatusHistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: JobApplicationStatusHistoryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ JobApplicationStatusHistoryScalarFieldEnumSchema, JobApplicationStatusHistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const JobApplicationStatusHistoryFindManyArgsSchema: z.ZodType<Prisma.JobApplicationStatusHistoryFindManyArgs> = z.object({
  select: JobApplicationStatusHistorySelectSchema.optional(),
  include: JobApplicationStatusHistoryIncludeSchema.optional(),
  where: JobApplicationStatusHistoryWhereInputSchema.optional(), 
  orderBy: z.union([ JobApplicationStatusHistoryOrderByWithRelationInputSchema.array(), JobApplicationStatusHistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: JobApplicationStatusHistoryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ JobApplicationStatusHistoryScalarFieldEnumSchema, JobApplicationStatusHistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const JobApplicationStatusHistoryAggregateArgsSchema: z.ZodType<Prisma.JobApplicationStatusHistoryAggregateArgs> = z.object({
  where: JobApplicationStatusHistoryWhereInputSchema.optional(), 
  orderBy: z.union([ JobApplicationStatusHistoryOrderByWithRelationInputSchema.array(), JobApplicationStatusHistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: JobApplicationStatusHistoryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const JobApplicationStatusHistoryGroupByArgsSchema: z.ZodType<Prisma.JobApplicationStatusHistoryGroupByArgs> = z.object({
  where: JobApplicationStatusHistoryWhereInputSchema.optional(), 
  orderBy: z.union([ JobApplicationStatusHistoryOrderByWithAggregationInputSchema.array(), JobApplicationStatusHistoryOrderByWithAggregationInputSchema ]).optional(),
  by: JobApplicationStatusHistoryScalarFieldEnumSchema.array(), 
  having: JobApplicationStatusHistoryScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const JobApplicationStatusHistoryFindUniqueArgsSchema: z.ZodType<Prisma.JobApplicationStatusHistoryFindUniqueArgs> = z.object({
  select: JobApplicationStatusHistorySelectSchema.optional(),
  include: JobApplicationStatusHistoryIncludeSchema.optional(),
  where: JobApplicationStatusHistoryWhereUniqueInputSchema, 
}).strict();

export const JobApplicationStatusHistoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.JobApplicationStatusHistoryFindUniqueOrThrowArgs> = z.object({
  select: JobApplicationStatusHistorySelectSchema.optional(),
  include: JobApplicationStatusHistoryIncludeSchema.optional(),
  where: JobApplicationStatusHistoryWhereUniqueInputSchema, 
}).strict();

export const ReminderFindFirstArgsSchema: z.ZodType<Prisma.ReminderFindFirstArgs> = z.object({
  select: ReminderSelectSchema.optional(),
  include: ReminderIncludeSchema.optional(),
  where: ReminderWhereInputSchema.optional(), 
  orderBy: z.union([ ReminderOrderByWithRelationInputSchema.array(), ReminderOrderByWithRelationInputSchema ]).optional(),
  cursor: ReminderWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReminderScalarFieldEnumSchema, ReminderScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ReminderFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReminderFindFirstOrThrowArgs> = z.object({
  select: ReminderSelectSchema.optional(),
  include: ReminderIncludeSchema.optional(),
  where: ReminderWhereInputSchema.optional(), 
  orderBy: z.union([ ReminderOrderByWithRelationInputSchema.array(), ReminderOrderByWithRelationInputSchema ]).optional(),
  cursor: ReminderWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReminderScalarFieldEnumSchema, ReminderScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ReminderFindManyArgsSchema: z.ZodType<Prisma.ReminderFindManyArgs> = z.object({
  select: ReminderSelectSchema.optional(),
  include: ReminderIncludeSchema.optional(),
  where: ReminderWhereInputSchema.optional(), 
  orderBy: z.union([ ReminderOrderByWithRelationInputSchema.array(), ReminderOrderByWithRelationInputSchema ]).optional(),
  cursor: ReminderWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReminderScalarFieldEnumSchema, ReminderScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ReminderAggregateArgsSchema: z.ZodType<Prisma.ReminderAggregateArgs> = z.object({
  where: ReminderWhereInputSchema.optional(), 
  orderBy: z.union([ ReminderOrderByWithRelationInputSchema.array(), ReminderOrderByWithRelationInputSchema ]).optional(),
  cursor: ReminderWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ReminderGroupByArgsSchema: z.ZodType<Prisma.ReminderGroupByArgs> = z.object({
  where: ReminderWhereInputSchema.optional(), 
  orderBy: z.union([ ReminderOrderByWithAggregationInputSchema.array(), ReminderOrderByWithAggregationInputSchema ]).optional(),
  by: ReminderScalarFieldEnumSchema.array(), 
  having: ReminderScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ReminderFindUniqueArgsSchema: z.ZodType<Prisma.ReminderFindUniqueArgs> = z.object({
  select: ReminderSelectSchema.optional(),
  include: ReminderIncludeSchema.optional(),
  where: ReminderWhereUniqueInputSchema, 
}).strict();

export const ReminderFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReminderFindUniqueOrThrowArgs> = z.object({
  select: ReminderSelectSchema.optional(),
  include: ReminderIncludeSchema.optional(),
  where: ReminderWhereUniqueInputSchema, 
}).strict();

export const TagFindFirstArgsSchema: z.ZodType<Prisma.TagFindFirstArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(), 
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(), TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema, TagScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const TagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TagFindFirstOrThrowArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(), 
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(), TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema, TagScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const TagFindManyArgsSchema: z.ZodType<Prisma.TagFindManyArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(), 
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(), TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema, TagScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const TagAggregateArgsSchema: z.ZodType<Prisma.TagAggregateArgs> = z.object({
  where: TagWhereInputSchema.optional(), 
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(), TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const TagGroupByArgsSchema: z.ZodType<Prisma.TagGroupByArgs> = z.object({
  where: TagWhereInputSchema.optional(), 
  orderBy: z.union([ TagOrderByWithAggregationInputSchema.array(), TagOrderByWithAggregationInputSchema ]).optional(),
  by: TagScalarFieldEnumSchema.array(), 
  having: TagScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const TagFindUniqueArgsSchema: z.ZodType<Prisma.TagFindUniqueArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema, 
}).strict();

export const TagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TagFindUniqueOrThrowArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema, 
}).strict();

export const JobApplicationFindFirstArgsSchema: z.ZodType<Prisma.JobApplicationFindFirstArgs> = z.object({
  select: JobApplicationSelectSchema.optional(),
  include: JobApplicationIncludeSchema.optional(),
  where: JobApplicationWhereInputSchema.optional(), 
  orderBy: z.union([ JobApplicationOrderByWithRelationInputSchema.array(), JobApplicationOrderByWithRelationInputSchema ]).optional(),
  cursor: JobApplicationWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ JobApplicationScalarFieldEnumSchema, JobApplicationScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const JobApplicationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.JobApplicationFindFirstOrThrowArgs> = z.object({
  select: JobApplicationSelectSchema.optional(),
  include: JobApplicationIncludeSchema.optional(),
  where: JobApplicationWhereInputSchema.optional(), 
  orderBy: z.union([ JobApplicationOrderByWithRelationInputSchema.array(), JobApplicationOrderByWithRelationInputSchema ]).optional(),
  cursor: JobApplicationWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ JobApplicationScalarFieldEnumSchema, JobApplicationScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const JobApplicationFindManyArgsSchema: z.ZodType<Prisma.JobApplicationFindManyArgs> = z.object({
  select: JobApplicationSelectSchema.optional(),
  include: JobApplicationIncludeSchema.optional(),
  where: JobApplicationWhereInputSchema.optional(), 
  orderBy: z.union([ JobApplicationOrderByWithRelationInputSchema.array(), JobApplicationOrderByWithRelationInputSchema ]).optional(),
  cursor: JobApplicationWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ JobApplicationScalarFieldEnumSchema, JobApplicationScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const JobApplicationAggregateArgsSchema: z.ZodType<Prisma.JobApplicationAggregateArgs> = z.object({
  where: JobApplicationWhereInputSchema.optional(), 
  orderBy: z.union([ JobApplicationOrderByWithRelationInputSchema.array(), JobApplicationOrderByWithRelationInputSchema ]).optional(),
  cursor: JobApplicationWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const JobApplicationGroupByArgsSchema: z.ZodType<Prisma.JobApplicationGroupByArgs> = z.object({
  where: JobApplicationWhereInputSchema.optional(), 
  orderBy: z.union([ JobApplicationOrderByWithAggregationInputSchema.array(), JobApplicationOrderByWithAggregationInputSchema ]).optional(),
  by: JobApplicationScalarFieldEnumSchema.array(), 
  having: JobApplicationScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const JobApplicationFindUniqueArgsSchema: z.ZodType<Prisma.JobApplicationFindUniqueArgs> = z.object({
  select: JobApplicationSelectSchema.optional(),
  include: JobApplicationIncludeSchema.optional(),
  where: JobApplicationWhereUniqueInputSchema, 
}).strict();

export const JobApplicationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.JobApplicationFindUniqueOrThrowArgs> = z.object({
  select: JobApplicationSelectSchema.optional(),
  include: JobApplicationIncludeSchema.optional(),
  where: JobApplicationWhereUniqueInputSchema, 
}).strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema, UserUncheckedCreateInputSchema ]),
}).strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
  create: z.union([ UserCreateInputSchema, UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema, UserUncheckedUpdateInputSchema ]),
}).strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema, UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema, UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema, UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const RequiredSkillCreateArgsSchema: z.ZodType<Prisma.RequiredSkillCreateArgs> = z.object({
  select: RequiredSkillSelectSchema.optional(),
  include: RequiredSkillIncludeSchema.optional(),
  data: z.union([ RequiredSkillCreateInputSchema, RequiredSkillUncheckedCreateInputSchema ]),
}).strict();

export const RequiredSkillUpsertArgsSchema: z.ZodType<Prisma.RequiredSkillUpsertArgs> = z.object({
  select: RequiredSkillSelectSchema.optional(),
  include: RequiredSkillIncludeSchema.optional(),
  where: RequiredSkillWhereUniqueInputSchema, 
  create: z.union([ RequiredSkillCreateInputSchema, RequiredSkillUncheckedCreateInputSchema ]),
  update: z.union([ RequiredSkillUpdateInputSchema, RequiredSkillUncheckedUpdateInputSchema ]),
}).strict();

export const RequiredSkillCreateManyArgsSchema: z.ZodType<Prisma.RequiredSkillCreateManyArgs> = z.object({
  data: z.union([ RequiredSkillCreateManyInputSchema, RequiredSkillCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const RequiredSkillCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RequiredSkillCreateManyAndReturnArgs> = z.object({
  data: z.union([ RequiredSkillCreateManyInputSchema, RequiredSkillCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const RequiredSkillDeleteArgsSchema: z.ZodType<Prisma.RequiredSkillDeleteArgs> = z.object({
  select: RequiredSkillSelectSchema.optional(),
  include: RequiredSkillIncludeSchema.optional(),
  where: RequiredSkillWhereUniqueInputSchema, 
}).strict();

export const RequiredSkillUpdateArgsSchema: z.ZodType<Prisma.RequiredSkillUpdateArgs> = z.object({
  select: RequiredSkillSelectSchema.optional(),
  include: RequiredSkillIncludeSchema.optional(),
  data: z.union([ RequiredSkillUpdateInputSchema, RequiredSkillUncheckedUpdateInputSchema ]),
  where: RequiredSkillWhereUniqueInputSchema, 
}).strict();

export const RequiredSkillUpdateManyArgsSchema: z.ZodType<Prisma.RequiredSkillUpdateManyArgs> = z.object({
  data: z.union([ RequiredSkillUpdateManyMutationInputSchema, RequiredSkillUncheckedUpdateManyInputSchema ]),
  where: RequiredSkillWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const RequiredSkillUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.RequiredSkillUpdateManyAndReturnArgs> = z.object({
  data: z.union([ RequiredSkillUpdateManyMutationInputSchema, RequiredSkillUncheckedUpdateManyInputSchema ]),
  where: RequiredSkillWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const RequiredSkillDeleteManyArgsSchema: z.ZodType<Prisma.RequiredSkillDeleteManyArgs> = z.object({
  where: RequiredSkillWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const JobApplicationStatusHistoryCreateArgsSchema: z.ZodType<Prisma.JobApplicationStatusHistoryCreateArgs> = z.object({
  select: JobApplicationStatusHistorySelectSchema.optional(),
  include: JobApplicationStatusHistoryIncludeSchema.optional(),
  data: z.union([ JobApplicationStatusHistoryCreateInputSchema, JobApplicationStatusHistoryUncheckedCreateInputSchema ]),
}).strict();

export const JobApplicationStatusHistoryUpsertArgsSchema: z.ZodType<Prisma.JobApplicationStatusHistoryUpsertArgs> = z.object({
  select: JobApplicationStatusHistorySelectSchema.optional(),
  include: JobApplicationStatusHistoryIncludeSchema.optional(),
  where: JobApplicationStatusHistoryWhereUniqueInputSchema, 
  create: z.union([ JobApplicationStatusHistoryCreateInputSchema, JobApplicationStatusHistoryUncheckedCreateInputSchema ]),
  update: z.union([ JobApplicationStatusHistoryUpdateInputSchema, JobApplicationStatusHistoryUncheckedUpdateInputSchema ]),
}).strict();

export const JobApplicationStatusHistoryCreateManyArgsSchema: z.ZodType<Prisma.JobApplicationStatusHistoryCreateManyArgs> = z.object({
  data: z.union([ JobApplicationStatusHistoryCreateManyInputSchema, JobApplicationStatusHistoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const JobApplicationStatusHistoryCreateManyAndReturnArgsSchema: z.ZodType<Prisma.JobApplicationStatusHistoryCreateManyAndReturnArgs> = z.object({
  data: z.union([ JobApplicationStatusHistoryCreateManyInputSchema, JobApplicationStatusHistoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const JobApplicationStatusHistoryDeleteArgsSchema: z.ZodType<Prisma.JobApplicationStatusHistoryDeleteArgs> = z.object({
  select: JobApplicationStatusHistorySelectSchema.optional(),
  include: JobApplicationStatusHistoryIncludeSchema.optional(),
  where: JobApplicationStatusHistoryWhereUniqueInputSchema, 
}).strict();

export const JobApplicationStatusHistoryUpdateArgsSchema: z.ZodType<Prisma.JobApplicationStatusHistoryUpdateArgs> = z.object({
  select: JobApplicationStatusHistorySelectSchema.optional(),
  include: JobApplicationStatusHistoryIncludeSchema.optional(),
  data: z.union([ JobApplicationStatusHistoryUpdateInputSchema, JobApplicationStatusHistoryUncheckedUpdateInputSchema ]),
  where: JobApplicationStatusHistoryWhereUniqueInputSchema, 
}).strict();

export const JobApplicationStatusHistoryUpdateManyArgsSchema: z.ZodType<Prisma.JobApplicationStatusHistoryUpdateManyArgs> = z.object({
  data: z.union([ JobApplicationStatusHistoryUpdateManyMutationInputSchema, JobApplicationStatusHistoryUncheckedUpdateManyInputSchema ]),
  where: JobApplicationStatusHistoryWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const JobApplicationStatusHistoryUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.JobApplicationStatusHistoryUpdateManyAndReturnArgs> = z.object({
  data: z.union([ JobApplicationStatusHistoryUpdateManyMutationInputSchema, JobApplicationStatusHistoryUncheckedUpdateManyInputSchema ]),
  where: JobApplicationStatusHistoryWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const JobApplicationStatusHistoryDeleteManyArgsSchema: z.ZodType<Prisma.JobApplicationStatusHistoryDeleteManyArgs> = z.object({
  where: JobApplicationStatusHistoryWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ReminderCreateArgsSchema: z.ZodType<Prisma.ReminderCreateArgs> = z.object({
  select: ReminderSelectSchema.optional(),
  include: ReminderIncludeSchema.optional(),
  data: z.union([ ReminderCreateInputSchema, ReminderUncheckedCreateInputSchema ]),
}).strict();

export const ReminderUpsertArgsSchema: z.ZodType<Prisma.ReminderUpsertArgs> = z.object({
  select: ReminderSelectSchema.optional(),
  include: ReminderIncludeSchema.optional(),
  where: ReminderWhereUniqueInputSchema, 
  create: z.union([ ReminderCreateInputSchema, ReminderUncheckedCreateInputSchema ]),
  update: z.union([ ReminderUpdateInputSchema, ReminderUncheckedUpdateInputSchema ]),
}).strict();

export const ReminderCreateManyArgsSchema: z.ZodType<Prisma.ReminderCreateManyArgs> = z.object({
  data: z.union([ ReminderCreateManyInputSchema, ReminderCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ReminderCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ReminderCreateManyAndReturnArgs> = z.object({
  data: z.union([ ReminderCreateManyInputSchema, ReminderCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ReminderDeleteArgsSchema: z.ZodType<Prisma.ReminderDeleteArgs> = z.object({
  select: ReminderSelectSchema.optional(),
  include: ReminderIncludeSchema.optional(),
  where: ReminderWhereUniqueInputSchema, 
}).strict();

export const ReminderUpdateArgsSchema: z.ZodType<Prisma.ReminderUpdateArgs> = z.object({
  select: ReminderSelectSchema.optional(),
  include: ReminderIncludeSchema.optional(),
  data: z.union([ ReminderUpdateInputSchema, ReminderUncheckedUpdateInputSchema ]),
  where: ReminderWhereUniqueInputSchema, 
}).strict();

export const ReminderUpdateManyArgsSchema: z.ZodType<Prisma.ReminderUpdateManyArgs> = z.object({
  data: z.union([ ReminderUpdateManyMutationInputSchema, ReminderUncheckedUpdateManyInputSchema ]),
  where: ReminderWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ReminderUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ReminderUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ReminderUpdateManyMutationInputSchema, ReminderUncheckedUpdateManyInputSchema ]),
  where: ReminderWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ReminderDeleteManyArgsSchema: z.ZodType<Prisma.ReminderDeleteManyArgs> = z.object({
  where: ReminderWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const TagCreateArgsSchema: z.ZodType<Prisma.TagCreateArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  data: z.union([ TagCreateInputSchema, TagUncheckedCreateInputSchema ]),
}).strict();

export const TagUpsertArgsSchema: z.ZodType<Prisma.TagUpsertArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema, 
  create: z.union([ TagCreateInputSchema, TagUncheckedCreateInputSchema ]),
  update: z.union([ TagUpdateInputSchema, TagUncheckedUpdateInputSchema ]),
}).strict();

export const TagCreateManyArgsSchema: z.ZodType<Prisma.TagCreateManyArgs> = z.object({
  data: z.union([ TagCreateManyInputSchema, TagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const TagCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TagCreateManyAndReturnArgs> = z.object({
  data: z.union([ TagCreateManyInputSchema, TagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const TagDeleteArgsSchema: z.ZodType<Prisma.TagDeleteArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema, 
}).strict();

export const TagUpdateArgsSchema: z.ZodType<Prisma.TagUpdateArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  data: z.union([ TagUpdateInputSchema, TagUncheckedUpdateInputSchema ]),
  where: TagWhereUniqueInputSchema, 
}).strict();

export const TagUpdateManyArgsSchema: z.ZodType<Prisma.TagUpdateManyArgs> = z.object({
  data: z.union([ TagUpdateManyMutationInputSchema, TagUncheckedUpdateManyInputSchema ]),
  where: TagWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const TagUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TagUpdateManyAndReturnArgs> = z.object({
  data: z.union([ TagUpdateManyMutationInputSchema, TagUncheckedUpdateManyInputSchema ]),
  where: TagWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const TagDeleteManyArgsSchema: z.ZodType<Prisma.TagDeleteManyArgs> = z.object({
  where: TagWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const JobApplicationCreateArgsSchema: z.ZodType<Prisma.JobApplicationCreateArgs> = z.object({
  select: JobApplicationSelectSchema.optional(),
  include: JobApplicationIncludeSchema.optional(),
  data: z.union([ JobApplicationCreateInputSchema, JobApplicationUncheckedCreateInputSchema ]),
}).strict();

export const JobApplicationUpsertArgsSchema: z.ZodType<Prisma.JobApplicationUpsertArgs> = z.object({
  select: JobApplicationSelectSchema.optional(),
  include: JobApplicationIncludeSchema.optional(),
  where: JobApplicationWhereUniqueInputSchema, 
  create: z.union([ JobApplicationCreateInputSchema, JobApplicationUncheckedCreateInputSchema ]),
  update: z.union([ JobApplicationUpdateInputSchema, JobApplicationUncheckedUpdateInputSchema ]),
}).strict();

export const JobApplicationCreateManyArgsSchema: z.ZodType<Prisma.JobApplicationCreateManyArgs> = z.object({
  data: z.union([ JobApplicationCreateManyInputSchema, JobApplicationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const JobApplicationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.JobApplicationCreateManyAndReturnArgs> = z.object({
  data: z.union([ JobApplicationCreateManyInputSchema, JobApplicationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const JobApplicationDeleteArgsSchema: z.ZodType<Prisma.JobApplicationDeleteArgs> = z.object({
  select: JobApplicationSelectSchema.optional(),
  include: JobApplicationIncludeSchema.optional(),
  where: JobApplicationWhereUniqueInputSchema, 
}).strict();

export const JobApplicationUpdateArgsSchema: z.ZodType<Prisma.JobApplicationUpdateArgs> = z.object({
  select: JobApplicationSelectSchema.optional(),
  include: JobApplicationIncludeSchema.optional(),
  data: z.union([ JobApplicationUpdateInputSchema, JobApplicationUncheckedUpdateInputSchema ]),
  where: JobApplicationWhereUniqueInputSchema, 
}).strict();

export const JobApplicationUpdateManyArgsSchema: z.ZodType<Prisma.JobApplicationUpdateManyArgs> = z.object({
  data: z.union([ JobApplicationUpdateManyMutationInputSchema, JobApplicationUncheckedUpdateManyInputSchema ]),
  where: JobApplicationWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const JobApplicationUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.JobApplicationUpdateManyAndReturnArgs> = z.object({
  data: z.union([ JobApplicationUpdateManyMutationInputSchema, JobApplicationUncheckedUpdateManyInputSchema ]),
  where: JobApplicationWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const JobApplicationDeleteManyArgsSchema: z.ZodType<Prisma.JobApplicationDeleteManyArgs> = z.object({
  where: JobApplicationWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();