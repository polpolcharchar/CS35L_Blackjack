import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { registerUser, setSession } from "./auth";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmed, setShowConfirmed] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        setErrors({});

        const result = registerUser({ username, email, password, confirmPassword });
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
                    Blackjack Register
                </div>

                <form onSubmit={handleRegister}>

                    <div className="inputSection">
                        <label className="sectionLabel">
                            Username
                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="uiInput"
                            placeholder="Choose a username"
                        />

                        {errors.username && (
                            <p className="errorText">
                                {errors.username}
                            </p>
                        )}
                    </div>

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
                                onChange={(e) => setPassword(e.target.value)}
                                className="uiInput"
                                placeholder="At least 8 characters"
                            />

                            <button
                                type="button"
                                className="uiButtonSecondary"
                                onClick={() => setShowPassword(!showPassword)}
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

                    <div className="inputSection">
                        <label className="sectionLabel">
                            Confirm Password
                        </label>
                        <div className="passwordWrapper">
                        <input
                            type={showConfirmed ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="uiInput"
                            placeholder="Re-enter your password"
                        />

                        <button
                                type="button"
                                className="uiButtonSecondary"
                                onClick={() => setShowConfirmed(!showConfirmed)}
                            >
                                {showConfirmed ? "Hide" : "Show"}
                            </button>
                            </div>

                        {errors.confirmPassword && (
                            <p className="errorText">
                                {errors.confirmPassword}
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
                            Register
                        </button>
                    </div>

                    <p className="authSwitch">
                        Already have an account?{" "}
                        <Link to="/auth/login">Login</Link>
                    </p>

                </form>

            </div>
        </div>
    );
}
