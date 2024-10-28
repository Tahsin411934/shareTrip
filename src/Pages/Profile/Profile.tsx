import React from "react";
import { useAuth } from "../../AuthProvider/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { axiosSecure } from "../../Hook/useAxiouSecure";

interface FormValues {
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
  role: string;
}

const Profile: React.FC = () => {
  const { user } = useAuth();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/users/${user?.email}`);
      return res.data;
    },
  });
  console.log(user?.email);
  console.log(data);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    try {
      console.log(formData);
      await axiosSecure.put(`api/users/${data?._id}`, formData);
      // Optionally, show a success message or refresh the data
      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      // Handle error, maybe show a notification or message
    }
    refetch();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Check if data is available before accessing its properties
  const defaultValues = {
    name: data?.name || "",
    email: data?.email || "",
    mobileNumber: data?.mobileNumber || "",
    password: "", // Keep empty for security reasons
    role: data?.role || "",
  };

  return (
    <div className="pt-16 font-Montserrat lg:w-[60%] mx-auto border border-blue-300">
      <div className="avatar online placeholder">
        <div className="bg-neutral text-neutral-content w-16 rounded-full">
          <span className="text-xl">AI</span>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="p-5">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            defaultValue={defaultValues.name} // Prefill with user data
            placeholder="Name"
            className="input input-bordered"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Mobile Number</span>
          </label>
          <input
            type="text"
            defaultValue={defaultValues.mobileNumber} // Prefill with user data
            placeholder="Mobile Number"
            className="input input-bordered"
            {...register("mobileNumber", {
              required: "Mobile Number is required",
            })}
          />
          {errors.mobileNumber && (
            <p className="text-red-500">{errors.mobileNumber.message}</p>
          )}
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            defaultValue={defaultValues.email} // Prefill with user data
            placeholder="Email"
            disabled
            className="input disable input-bordered"
          />
        </div>

        <button type="submit" className="btn bg-[#1E1743] text-white mt-4">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
