import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
    beforeAuth: (req) => {
        if (!req.url.endsWith("/console")) {
            return false;
        }

        return redirectToSignIn();
    },

    // Ensure that locale specific sign-in pages are public
    publicRoutes: ["/", "/:locale/sign-in"],
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};