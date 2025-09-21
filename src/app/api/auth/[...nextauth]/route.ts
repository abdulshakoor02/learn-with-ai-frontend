import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Define our custom user type
interface BackendUser {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  createdAt: string;
  updatedAt: string;
}

interface LoginResponse {
  access_token: string;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your@email.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          if (!apiUrl) {
            console.error("API URL not configured");
            return null;
          }

          // Make request to backend login endpoint
          const loginResponse = await fetch(`${apiUrl}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!loginResponse.ok) {
            console.error(
              "Login failed:",
              loginResponse.status,
              loginResponse.statusText,
            );
            return null;
          }

          const loginData: LoginResponse = await loginResponse.json();

          if (!loginData.access_token) {
            console.error("No access token received");
            return null;
          }

          // Get user details using the access token
          const userResponse = await fetch(
            `${apiUrl}/users/email/${credentials.email}`,
            {
              headers: {
                Authorization: `Bearer ${loginData.access_token}`,
              },
            },
          );

          if (!userResponse.ok) {
            console.error("Failed to fetch user details");
            return null;
          }

          const userData: BackendUser = await userResponse.json();

          // Return user object that will be stored in the JWT
          return {
            id: userData._id,
            email: userData.email,
            name: userData.name,
            mobile: userData.mobile,
            accessToken: loginData.access_token,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user && account) {
        token.accessToken = (user as any).accessToken;
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.mobile = (user as any).mobile;
      }

      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        // Add custom properties
        (session.user as any).mobile = token.mobile as string;
        (session as any).accessToken = token.accessToken as string;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      // After successful login, redirect to home
      if (url === "/home/login" || url === baseUrl + "/home/login") {
        return baseUrl + "/home";
      }
      return url;
    },
  },
  pages: {
    signIn: "/home/login",
  },
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
