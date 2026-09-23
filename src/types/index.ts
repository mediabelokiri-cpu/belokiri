import { Role, UserStatus, ArticleStatus, ActivityAction } from "@prisma/client";

export { Role, UserStatus, ArticleStatus, ActivityAction };

export type ApiResponse<T = unknown> =
  | {
      success: true;
      data: T;
      message?: string;
    }
  | {
      success: false;
      message: string;
      code?: string;
    };

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface RubrikDef {
  name: string;
  slug: string;
  description: string;
}

export interface AuthorProfile {
  id: string;
  name: string;
  penName: string | null;
  slug: string;
  avatarUrl: string | null;
  bio: string | null;
  articleCount?: number;
}

export interface ArticleCardData {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  featuredImageCaption: string | null;
  publishedAt: Date | string | null;
  views: number;
  isEditorPick: boolean;
  author: {
    name: string;
    penName: string | null;
    slug: string;
    avatarUrl: string | null;
  };
  category: {
    name: string;
    slug: string;
  };
}

export interface UserSessionData {
  id: string;
  email: string;
  name: string;
  penName: string | null;
  slug: string;
  avatarUrl: string | null;
  role: Role;
  status: UserStatus;
}
