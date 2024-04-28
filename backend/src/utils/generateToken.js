import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "15d",
        });
        console.log(
            "🚀 ~ generateTokenAndSetCookie ~ chuẩn bị gửi token:",
            token
        );

        res.cookie("accessToken", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
        });
    } catch (error) {
        console.log("🚀 ~ generateTokenAndSetCookie ~ error:", error);
    }
};

export default generateTokenAndSetCookie;
