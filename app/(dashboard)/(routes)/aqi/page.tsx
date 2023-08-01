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

interface WeatherDataItem {
  overall_aqi: number;
}

import axios from "axios";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AqiPage = () => {
  const [weather, setWeather] = useState<WeatherDataItem[]>([]);
  const [place, setPlace] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      place: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setPlace(values.place);

    try {
      const response = await axios.post("/api/aqi", {
        place: values.place,
      });

      const weatherDataItem: WeatherDataItem = {
        overall_aqi: response.data.overall_aqi,
      };

      setWeather([weatherDataItem]);
      form.reset();

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="mt-52 flex flex-col text-center space-y-2 justify-center">
      <div className="mx-10 pt-8 bg-pink-500/10 rounded-lg">
        <div>
          <div className="text-4xl text-black/100">AQI</div>
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
                      Search for a city to display its AQI.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Search</Button>
            </form>
          </Form>

          <div className="py-7 ">
            {weather.map((weat) => (
              <Card key={weat.overall_aqi}>
                <CardHeader>
                  <CardTitle>{weat.overall_aqi}</CardTitle>
                  <CardDescription>{place}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <p>{weat.overall_aqi > 200 ? " Unpleasant" : "Pleasant"}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AqiPage;
