declare global {
  namespace Express {
    interface Request {
      user?: {
        name: string;
        email: string;
        currency: string;
        isPro: boolean;
        proExpiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        profileImage: string | null;
        id: number;
      };
    }
  }
}
export {};
