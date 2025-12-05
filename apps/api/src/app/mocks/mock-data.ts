export type AuthRole = 'USER' | 'ORG_USER' | 'ADMIN';

export interface MockMembership {
  companyId: string;
  companyName: string;
  orgRole: string;
}

export interface MockUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  role: AuthRole;
  memberships: MockMembership[];
}

export interface MockSessionPayload {
  user: MockUser;
  role: AuthRole;
  memberships: MockMembership[];
  expiresAt: string;
  sessionId: string;
}

export const mockProviders = [
  { id: 'google', name: 'Google', hint: 'Use your Google Workspace account' },
  { id: 'linkedin', name: 'LinkedIn', hint: 'Great for company admins' },
] as const;

export const mockUsers: MockUser[] = [
  {
    id: 'user-basic',
    email: 'tyler@demo.dev',
    firstName: 'Tyler',
    lastName: 'Applicant',
    role: 'USER',
    avatarUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=tyler',
    memberships: [],
  },
  {
    id: 'user-org',
    email: 'mia@cobalt.ai',
    firstName: 'Mia',
    lastName: 'Operator',
    role: 'ORG_USER',
    avatarUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=mia',
    memberships: [
      { companyId: 'cobalt', companyName: 'Cobalt Robotics', orgRole: 'OWNER' },
      { companyId: 'acme', companyName: 'Acme Corp', orgRole: 'EDITOR' },
    ],
  },
  {
    id: 'user-admin',
    email: 'kim@jobboard.io',
    firstName: 'Kim',
    lastName: 'Root',
    role: 'ADMIN',
    avatarUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=kim',
    memberships: [{ companyId: 'job-board', companyName: 'Job Board HQ', orgRole: 'ADMIN' }],
  },
];

export const mockSessions = {
  defaultTtlMinutes: 60,
};

