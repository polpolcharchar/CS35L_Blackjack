import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { loginUser, setSession } from "./auth";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setErrors({});

        const result = loginUser({ email, password });
        if (!result.ok) {
            setErrors(result.errors);
            return;
        }

        setSession(result.user);
        navigate("/");
    };

    return (
        <div className="tableLayout">
            <div className="uiCard">

                <div className="tableTitle">
                    Blackjack Login
                </div>

                <form onSubmit={handleLogin}>

                    <div className="inputSection">
                        <label className="sectionLabel">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="uiInput"
                            placeholder="Enter your email"
                        />

                        {errors.email && (
                            <p className="errorText">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="inputSection">

                        <label className="sectionLabel">
                            Password
                        </label>

                        <div className="passwordWrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                className="uiInput"
                                placeholder="Enter your password"
                            />

                            <button
                                type="button"
                                className="uiButtonSecondary"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        {errors.password && (
                            <p className="errorText">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {errors.general && (
                        <div className="winnerBanner">
                            {errors.general}
                        </div>
                    )}

                    <div className="buttonRow">
                        <button
                            type="submit"
                            className="uiButton"
                        >
                            Login
                        </button>
                    </div>

                    <p className="authSwitch">
                        Don't have an account?{" "}
                        <Link to="/auth/register">Register</Link>
                    </p>

                </form>

            </div>
        </div>
    );
}