"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import * as z from "zod";

const formSchema = z.object({
  place: z.string().min(2).max(50),
});

interface InputFormProps {
  title: string;
}

import axios from "axios";

const InputForm = ({ title }: InputFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      place: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const options = {
      method: "GET",
      url: "https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality",
      params: { city: values.place },
      headers: {
        "X-RapidAPI-Key": "b8eb4c64d1msh82f4f5538e5065ap1d2b92jsn7113e96b5efb",
        "X-RapidAPI-Host": "air-quality-by-api-ninjas.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div>
        <div className="text-4xl text-black/100">{title}</div>
        <div className="mt-2 text-sm text-muted-foreground">
          Search for any city.
        </div>
      </div>
      <div className="pt-8 flex flex-col items-center space-y-2 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="place"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Lahore" {...field} />
                  </FormControl>
                  <FormDescription>
                    Search for a city to display its {title}.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Search</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default InputForm;
