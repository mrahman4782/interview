"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExampleApiUsage } from "@/components/example-api-usage";

export default function Home() {
  const [calls, setCalls] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Load persisted calls on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("calls");
      if (stored) {
        setCalls(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to load calls from storage", err);
    }
  }, []);

  // Save calls whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("calls", JSON.stringify(calls));
    } catch (err) {
      console.error("Failed to save calls to storage", err);
    }
  }, [calls]);

  const openForm = () => setShowForm(true);
  const closeForm = () => {
    setShowForm(false);
    setName("");
    setPhone("");
  };

 const handleSubmit = async (e: any) => {
  e.preventDefault();
  const entry = `${name}: ${phone}`;
  setCalls(prev => [...prev, entry]);

  try {
    const res = await fetch("/api/call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        number: phone, // match your backend key: `number`
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("API call failed:", errorData);
    } else {
      const result = await res.json();
      console.log("Call initiated:", result);
    }
  } catch (err) {
    console.error("Error contacting API:", err);
  }

  closeForm();
};


  return (
    <main className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">AI Phone Screen Operator Console</h1>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Start New Call</CardTitle>
              <CardDescription>
                Initiate an automated phone screen with a candidate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                TODO: Implement call initiation form with phone number input
              </p>
              <Button onClick={openForm}>Start Call</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Calls</CardTitle>
              <CardDescription>
                View transcripts and details from previous screening calls
              </CardDescription>
            </CardHeader>
            <CardContent>
              {calls.length > 0 ? (
                <ul className="space-y-2">
                  {calls.map((call, idx) => (
                    <li key={idx} className="p-2 border rounded">
                      {call}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No calls yet</p>
              )}
            </CardContent>
          </Card>

          <ExampleApiUsage />
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
          >
            <h2 className="text-xl font-semibold mb-4">New Call Details</h2>
            <div className="mb-4">
              <label className="block mb-1 font-medium" htmlFor="name">
                Candidate Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium" htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="secondary" onClick={closeForm}>
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
