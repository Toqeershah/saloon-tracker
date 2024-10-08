// "use client";
// import ErrorMessage from "@/app/components/ErrorMessage";
// import Spinner from "@/app/components/Spinner";
// import { saloonSchema } from "@/app/validationSchemas";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Saloon } from "@prisma/client";
// import { Button, Callout, TextField } from "@radix-ui/themes";
// import axios from "axios";
// import "easymde/dist/easymde.min.css";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import SimpleMDE from "react-simplemde-editor";
// import { z } from "zod";


// // const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
// //   ssr: false,
// // });

// type SaloonFormData = z.infer<typeof saloonSchema>;



// const SaloonForm = ({ saloon }: { saloon?: Saloon }) => {
//   const router = useRouter();
//   const {
//     register,
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SaloonFormData>({
//     resolver: zodResolver(saloonSchema),
//   });
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       setIsSubmitting(true);
  
//       if (saloon) {
//         // if we have a saloon then update it otherwise create new
//         await axios.patch("/api/saloons/" + saloon.id, data);
//         toast.success("Saloon updated successfully!");
//       } else {
//         await axios.post("/api/saloons", data);
//         toast.success("Saloon created successfully!");
//       }
  
//       router.push("/saloons/list");
//     } catch (error) {
//       setIsSubmitting(false);
//       setError("Failed to Create Saloons");
//       toast.error("Failed to Create/Update Saloon");
//     }
//     // try {
//     //   setIsSubmitting(true);
//     //   if (saloon)
//     //     // if we have a saloon then update it otherwise create new
//     //     await axios.patch("/api/saloons/" + saloon.id, data);
//     //   else await axios.post("/api/saloons", data);
//     //   router.push("/saloons/list");
//     // } catch (error) {
//     //   setIsSubmitting(false);
//     //   setError("Failed to Create Saloons");
//     //   toast.error("Failed to Create/Update Saloon");
//     // }
//   });

//   return (
//     <div className="max-w-xl">
//       {error && (
//         <Callout.Root color="red" className="mb-5">
//           <Callout.Text>{error}</Callout.Text>
//         </Callout.Root>
//       )}
//       <form className="space-y-3" onSubmit={onSubmit}>
//         <TextField.Root>
//           <TextField.Input
//             defaultValue={saloon?.title}
//             placeholder="Title of Saloon"
//             {...register("title")}
//           />
//         </TextField.Root>
//         <ErrorMessage>{errors.title?.message}</ErrorMessage>
//         <Controller
//           name="description"
//           control={control}
//           defaultValue={saloon?.description}
//           render={({ field }) => (
//             <SimpleMDE placeholder="Description of Saloon" {...field} />
//           )}
//         />

//         <ErrorMessage>{errors.description?.message}</ErrorMessage>
//         <Button disabled={isSubmitting}>
//           {saloon ? "Update Saloon" : "Add New Saloon"}{" "}
//           {isSubmitting && <Spinner />}
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default SaloonForm;

"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { saloonSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Saloon } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type SaloonFormData = z.infer<typeof saloonSchema>;

const SaloonForm = ({ saloon }: { saloon?: Saloon }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SaloonFormData>({
    resolver: zodResolver(saloonSchema),
  });

  const [error, setError] = useState<string | null>(null); // Use null as the default value
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (saloon) {
        await axios.patch("/api/saloons/" + saloon.id, data);
        toast.success("Saloon updated successfully!");
      } else {
        await axios.post("/api/saloons", data);
        toast.success("Saloon created successfully!");
      }
      router.push("/saloons/list");
    } catch (error) {
      setError("Failed to Create/Update Saloon"); // Set the error message
      toast.error("Failed to Create/Update Saloon");
    } finally {
      setIsSubmitting(false); // Ensure to reset submitting state
    }
  });

  return (
    <div className="max-w-xl">
      {error && ( // Render the error message if it exists
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={saloon?.title}
            placeholder="Title of Saloon"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={saloon?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description of Saloon" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {saloon ? "Update Saloon" : "Add New Saloon"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default SaloonForm;
