"use client"

import axios from "axios";
import Heading from "@/components/heading";
import { MessagesSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ChatCompletionUserMessageParam } from "openai/resources/index.mjs";
import { useState } from "react";


const ConversationPage = () => {

    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionUserMessageParam[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues : {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async ( values: z.infer<typeof formSchema>    ) => {
        
        try {
            const userMessage: ChatCompletionUserMessageParam = {
                role: "user",
                content: values.prompt  
            };

            const newMessage = [...messages, userMessage];

            const response = await axios.post("/api/conversation", {
                messages: newMessage
            });

            setMessages((current) => [...current, userMessage, response.data.message]);

            form.reset();
        } catch (error) {
            // OPEN PRO MODEL
            console.log(error);
        } finally {
            router.refresh();
        }
    };

    return (
        <div>
            <Heading 
                title={"Conversation"} 
                description={"Advance Conversation Mddel"} 
                icon={MessagesSquare}
                iconColor={"text-violet-500"}
                bgColor={"bg-violet-500/10"}>
            </Heading>
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form 
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounder-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >

                            <FormField
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                <FormControl className="m-0 p-0">
                                <Input
                                    className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                    disabled={isLoading}
                                    placeholder="How do I calculate the radius of a circle?"
                                    {...field}
                                    />
                                </FormControl>
                                </FormItem>
                            )}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Generate
                                
                            </Button>
                        </form>
                    </Form>

                </div>
                <div className="space-y-4 mt-4">
                    <div className="flex flex-col-reverse gap-y-4">
                            {messages.map((message) => (
                                <div key={message}>
                                    {message.content}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );  
};

export default ConversationPage;