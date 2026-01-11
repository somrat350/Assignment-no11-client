import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  FaRegEye,
  FaRegEyeSlash,
  FaStar,
  FaUser,
  FaEnvelope,
  FaLock,
  FaHeart,
  FaShieldAlt,
  FaImage,
  FaVenusMars,
  FaTint,
  FaMapMarkerAlt,
  FaUserPlus,
} from "react-icons/fa";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import Loading from "../../Components/Loading";
import DemoCredentialsButton from "../../Components/Auth/DemoCredentialsButton";
import GoogleSignInButton from "../../Components/Auth/GoogleSignInButton";
import authImg from "../../assets/authImg.png";

const Register = () => {
  const { createUEP, updateUser, setUserLoading } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const instance = useAxios();

  const [passwordType, setPasswordType] = useState(true);
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [passValidateText, setPassValidateText] = useState("");
  const [password, setPassword] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const division = useWatch({ control, name: "division" });
  const district = useWatch({ control, name: "district" });

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    axios.get("/divisions.json").then((res) => {
      setDivisions(res.data);
    });
    axios.get("/districts.json").then((res) => {
      setDistricts(res.data);
    });
    axios.get("/upazilas.json").then((res) => {
      setUpazilas(res.data);
      setLoading(false);
    });
  }, []);

  // password validation
  const passwordValidate = (e) => {
    const tempPass = e.target.value;
    setPassword("");

    if (!/[a-z]/.test(tempPass)) {
      setPassValidateText("Password must contain lowercase.");
      return;
    } else if (!/[A-Z]/.test(tempPass)) {
      setPassValidateText("Password must contain Uppercase.");
      return;
    } else if (tempPass.length < 6) {
      setPassValidateText("Password must 6 letters.");
      return;
    } else {
      setPassValidateText("");
      setPassword(tempPass);
      return;
    }
  };

  const districtsByDivision = (divisionId) => {
    const divisionDistricts = districts.filter(
      (district) => district.division_id === divisionId
    );
    return divisionDistricts.map((d) => d);
  };

  const upazilaByDistrict = (districtId) => {
    const districtUpazilas = upazilas.filter(
      (upazila) => upazila.district_id === districtId
    );
    return districtUpazilas.map((u) => u);
  };

  // upload image on imgBB website
  const uploadImage = async (userImage) => {
    const formData = new FormData();
    formData.append("image", userImage);
    const imgApiUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMG_BB_API
    }`;
    const res = await axios.post(imgApiUrl, formData);
    return res.data.data.url;
  };

  // handle form data on submit
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setLoading(true);

    if (!password) {
      toast.error("Please enter validate password!");
      setLoading(false);
      setIsSubmitting(false);
      return;
    }
    if (password !== data.confirmPassword) {
      setConfirmError("Confirm password not matched.");
      setLoading(false);
      setIsSubmitting(false);
      return;
    } else {
      setConfirmError("");
    }

    const finalDivision = divisions.find((d) => data.division === d.id);
    const finalDistrict = districts.find((d) => data.district === d.id);

    createUEP(data.email, data.confirmPassword)
      .then(async (res) => {
        // upload image to imgbb
        const photoURL = await uploadImage(data.userImage[0]);

        // store user to mongodb
        const userInfo = {
          name: data.name,
          email: res.user.email,
          photoURL,
          division: finalDivision.name,
          district: finalDistrict.name,
          upazila: data.upazila,
          gender: data.gender,
          bloodGroup: data.bloodGroup,
          role: "donor",
          status: "active",
        };
        await instance.post("/newUser", userInfo);

        // upload image
        const updatedUserInfo = {
          photoURL,
          displayName: data.name,
        };
        // update user info
        return updateUser(updatedUserInfo);
      })
      .then(() => {
        navigate(from);
        toast.success("Registration successful.");
      })
      .finally(() => {
        setLoading(false);
        setUserLoading(false);
        setIsSubmitting(false);
      });
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-linear-to-br from-base-200 via-base-100 to-base-200 py-8 px-4 relative overflow-hidden">
      <title>Register | BloodLine</title>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-secondary rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-40 h-40 bg-primary rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-success rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="w-full mx-auto max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-linear-to-br from-secondary to-secondary/80 rounded-3xl flex items-center justify-center shadow-2xl animate-bounce">
                <FaUserPlus className="text-3xl text-white" />
              </div>
              {/* Sparkle Effects */}
              <HiSparkles className="absolute -top-2 -right-2 text-2xl text-secondary animate-pulse" />
              <HiSparkles
                className="absolute -bottom-2 -left-2 text-lg text-primary animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
              <HiLightningBolt
                className="absolute top-1/2 -right-6 text-xl text-accent animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-base-content mb-4">
            Join the <span className="text-secondary">Heroes</span>
          </h1>
          <p className="text-lg sm:text-xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
            Become a BloodLine hero and help save lives in your community. Every
            registration brings hope to someone in need.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-base-content/60">
            <div className="flex items-center">
              <FaShieldAlt className="mr-2 text-success" />
              Secure Registration
            </div>
            <div className="flex items-center">
              <FaHeart className="mr-2 text-secondary" />
              Save Lives
            </div>
            <div className="flex items-center">
              <HiLightningBolt className="mr-2 text-warning" />
              Quick Setup
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left Side - Image & Info */}
          <div className="lg:col-span-1 hidden lg:flex flex-col items-center justify-center">
            <div className="relative mb-8">
              <img
                src={authImg}
                alt="Blood Donation"
                className="w-full max-w-sm rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-linear-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <FaHeart className="text-2xl text-base-100" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-linear-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <HiSparkles className="text-xl text-base-100" />
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-base-content mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="text-base-content/70 leading-relaxed mb-6">
                Join thousands of heroes who are already making a difference.
                Your blood donation can save up to 3 lives!
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-base-200 rounded-xl p-4">
                  <div className="text-2xl font-bold text-secondary">25K+</div>
                  <div className="text-xs text-base-content/60">
                    Heroes Registered
                  </div>
                </div>
                <div className="bg-base-200 rounded-xl p-4">
                  <div className="text-2xl font-bold text-secondary">10K+</div>
                  <div className="text-xs text-base-content/60">
                    Lives Saved
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-2xl border border-base-300 relative overflow-hidden">
              <div className="card-body px-1 sm:p-8 lg:p-10">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-base-content mb-2">
                    Create Your Hero Account
                  </h3>
                  <p className="text-base-content/70">
                    Fill in your details to get started
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full space-y-6"
                >
                  {/* Personal Information Section */}
                  <div className="bg-base-200/50 rounded-2xl px-2 py-6">
                    <h4 className="text-lg font-bold text-base-content mb-4 flex items-center">
                      <FaUser className="mr-2 text-secondary" />
                      Personal Information
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold flex items-center">
                            <FaUser className="mr-2 text-secondary" />
                            Full Name
                            <sup className="text-error ml-1">
                              <FaStar className="text-xs" />
                            </sup>
                          </span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            {...register("name", {
                              required: "Name is required",
                            })}
                            placeholder="Enter your full name"
                            className={`input input-bordered w-full pl-12 transition-all duration-300 ${
                              errors.name
                                ? "input-error"
                                : "focus:input-secondary"
                            }`}
                          />
                          <FaUser className="absolute z-10 left-4 top-1/2 transform -translate-y-1/2 text-base-content/40" />
                        </div>
                        {errors.name && (
                          <label className="label">
                            <span className="label-text-alt text-error">
                              {errors.name.message}
                            </span>
                          </label>
                        )}
                      </div>

                      {/* Email */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold flex items-center">
                            <FaEnvelope className="mr-2 text-secondary" />
                            Email Address
                            <sup className="text-error ml-1">
                              <FaStar className="text-xs" />
                            </sup>
                          </span>
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Invalid email address",
                              },
                            })}
                            placeholder="Enter your email address"
                            className={`input input-bordered w-full pl-12 transition-all duration-300 ${
                              errors.email
                                ? "input-error"
                                : "focus:input-secondary"
                            }`}
                          />
                          <FaEnvelope className="absolute z-10 left-4 top-1/2 transform -translate-y-1/2 text-base-content/40" />
                        </div>
                        {errors.email && (
                          <label className="label">
                            <span className="label-text-alt text-error">
                              {errors.email.message}
                            </span>
                          </label>
                        )}
                      </div>

                      {/* Profile Image */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold flex items-center">
                            <FaImage className="mr-2 text-secondary" />
                            Profile Image
                            <sup className="text-error ml-1">
                              <FaStar className="text-xs" />
                            </sup>
                          </span>
                        </label>
                        <input
                          type="file"
                          {...register("userImage", {
                            required: "Profile image is required",
                          })}
                          className={`file-input file-input-bordered file-input-secondary w-full ${
                            errors.userImage ? "file-input-error" : ""
                          }`}
                          accept="image/*"
                        />
                        {errors.userImage && (
                          <label className="label">
                            <span className="label-text-alt text-error">
                              {errors.userImage.message}
                            </span>
                          </label>
                        )}
                      </div>

                      {/* Gender */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold flex items-center">
                            <FaVenusMars className="mr-2 text-secondary" />
                            Gender
                            <sup className="text-error ml-1">
                              <FaStar className="text-xs" />
                            </sup>
                          </span>
                        </label>
                        <select
                          {...register("gender", {
                            required: "Gender is required",
                          })}
                          className={`select select-bordered w-full ${
                            errors.gender
                              ? "select-error"
                              : "focus:select-secondary"
                          }`}
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select Gender
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                        {errors.gender && (
                          <label className="label">
                            <span className="label-text-alt text-error">
                              {errors.gender.message}
                            </span>
                          </label>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Medical Information Section */}
                  <div className="bg-base-200/50 rounded-2xl px-2 py-6">
                    <h4 className="text-lg font-bold text-base-content mb-4 flex items-center">
                      <FaTint className="mr-2 text-secondary" />
                      Medical Information
                    </h4>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold flex items-center">
                          <FaTint className="mr-2 text-secondary" />
                          Blood Group
                          <sup className="text-error ml-1">
                            <FaStar className="text-xs" />
                          </sup>
                        </span>
                      </label>
                      <select
                        {...register("bloodGroup", {
                          required: "Blood group is required",
                        })}
                        className={`select select-bordered w-full ${
                          errors.bloodGroup
                            ? "select-error"
                            : "focus:select-secondary"
                        }`}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select Blood Group
                        </option>
                        {bloodGroups.map((bg, i) => (
                          <option key={i} value={bg}>
                            {bg}
                          </option>
                        ))}
                      </select>
                      {errors.bloodGroup && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {errors.bloodGroup.message}
                          </span>
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Location Information Section */}
                  <div className="bg-base-200/50 rounded-2xl px-2 py-6">
                    <h4 className="text-lg font-bold text-base-content mb-4 flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-secondary" />
                      Location Information
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Division */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text flex font-semibold">
                            Division
                            <sup className="text-error flex">
                              <FaStar className="text-xs" />
                            </sup>
                          </span>
                        </label>
                        <select
                          {...register("division", {
                            required: "Division is required",
                          })}
                          className={`select select-bordered w-full ${
                            errors.division
                              ? "select-error"
                              : "focus:select-secondary"
                          }`}
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select Division
                          </option>
                          {divisions.map((division) => (
                            <option key={division.id} value={division.id}>
                              {division.name}
                            </option>
                          ))}
                        </select>
                        {errors.division && (
                          <label className="label">
                            <span className="label-text-alt text-error">
                              {errors.division.message}
                            </span>
                          </label>
                        )}
                      </div>

                      {/* District */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text flex font-semibold">
                            District{" "}
                            <sup className="text-error">
                              <FaStar className="text-xs" />
                            </sup>
                          </span>
                        </label>
                        <select
                          {...register("district", {
                            required: "District is required",
                          })}
                          className={`select select-bordered w-full ${
                            errors.district
                              ? "select-error"
                              : "focus:select-secondary"
                          }`}
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select District
                          </option>
                          {districtsByDivision(division).map((district) => (
                            <option key={district.id} value={district.id}>
                              {district.name}
                            </option>
                          ))}
                        </select>
                        {errors.district && (
                          <label className="label">
                            <span className="label-text-alt text-error">
                              {errors.district.message}
                            </span>
                          </label>
                        )}
                      </div>

                      {/* Upazila */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text flex font-semibold">
                            Upazila{" "}
                            <sup className="text-error">
                              <FaStar className="text-xs" />
                            </sup>
                          </span>
                        </label>
                        <select
                          {...register("upazila", {
                            required: "Upazila is required",
                          })}
                          className={`select select-bordered w-full ${
                            errors.upazila
                              ? "select-error"
                              : "focus:select-secondary"
                          }`}
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select Upazila
                          </option>
                          {upazilaByDistrict(district).map((upazila) => (
                            <option key={upazila.id} value={upazila.name}>
                              {upazila.name}
                            </option>
                          ))}
                        </select>
                        {errors.upazila && (
                          <label className="label">
                            <span className="label-text-alt text-error">
                              {errors.upazila.message}
                            </span>
                          </label>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Security Information Section */}
                  <div className="bg-base-200/50 rounded-2xl px-2 py-6">
                    <h4 className="text-lg font-bold text-base-content mb-4 flex items-center">
                      <FaLock className="mr-2 text-secondary" />
                      Security Information
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Password */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold flex items-center">
                            <FaLock className="mr-2 text-secondary" />
                            Password
                            <sup className="text-error ml-1">
                              <FaStar className="text-xs" />
                            </sup>
                          </span>
                        </label>
                        <div className="relative">
                          <input
                            type={passwordType ? "password" : "text"}
                            name="password"
                            onChange={passwordValidate}
                            placeholder="Enter your password"
                            className="input input-bordered w-full pl-12 pr-12 focus:input-secondary"
                            required
                          />
                          <FaLock className="absolute z-10 left-4 top-1/2 transform -translate-y-1/2 text-base-content/40" />
                          <button
                            type="button"
                            onClick={() => setPasswordType(!passwordType)}
                            className="absolute z-10 text-lg cursor-pointer right-4 top-1/2 transform -translate-y-1/2 text-base-content/40 hover:text-secondary transition-colors duration-200"
                          >
                            {passwordType ? <FaRegEyeSlash /> : <FaRegEye />}
                          </button>
                        </div>
                        {passValidateText && (
                          <label className="label">
                            <span className="label-text-alt text-error">
                              {passValidateText}
                            </span>
                          </label>
                        )}
                      </div>

                      {/* Confirm Password */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold flex items-center">
                            <FaLock className="mr-2 text-secondary" />
                            Confirm Password
                            <sup className="text-error ml-1">
                              <FaStar className="text-xs" />
                            </sup>
                          </span>
                        </label>
                        <div className="relative">
                          <input
                            type={confirmPasswordType ? "password" : "text"}
                            {...register("confirmPassword", {
                              required: "Please confirm your password",
                            })}
                            placeholder="Confirm your password"
                            className="input input-bordered w-full pl-12 pr-12 focus:input-secondary"
                          />
                          <FaLock className="absolute z-10 left-4 top-1/2 transform -translate-y-1/2 text-base-content/40" />
                          <button
                            type="button"
                            onClick={() =>
                              setConfirmPasswordType(!confirmPasswordType)
                            }
                            className="absolute z-10 text-lg cursor-pointer right-4 top-1/2 transform -translate-y-1/2 text-base-content/40 hover:text-secondary transition-colors duration-200"
                          >
                            {confirmPasswordType ? (
                              <FaRegEyeSlash />
                            ) : (
                              <FaRegEye />
                            )}
                          </button>
                        </div>
                        {confirmError && (
                          <label className="label">
                            <span className="label-text-alt text-error">
                              {confirmError}
                            </span>
                          </label>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Register Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn btn-secondary btn-lg w-full transition-all duration-300 transform hover:scale-105`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Creating Your Hero Account...
                      </>
                    ) : (
                      <>
                        <FaUserPlus className="mr-2" />
                        Join the Heroes
                      </>
                    )}
                  </button>

                  {/* Divider */}
                  <div className="divider text-base-content/60">
                    or continue with
                  </div>

                  {/* Social Registration Buttons */}
                  <div className="space-y-3">
                    <GoogleSignInButton />
                    <DemoCredentialsButton />
                  </div>

                  {/* Login Link */}
                  <div className="text-center pt-4 border-t border-base-content/10">
                    <p className="text-base-content/70">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-secondary font-semibold hover:underline transition-all duration-200"
                      >
                        Sign In Here
                      </Link>
                    </p>
                  </div>
                </form>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 opacity-20">
                <HiSparkles
                  className="text-2xl text-secondary animate-spin"
                  style={{ animationDuration: "3s" }}
                />
              </div>
              <div className="absolute bottom-4 left-4 opacity-20">
                <FaHeart className="text-xl text-primary animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
