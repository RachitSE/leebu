'use client';

import { useEffect, useState } from 'react';
import MemoryCard from '@/components/MemoryCard';
import Header from '@/components/Header';

interface Memory {
  _id: string;
  title: string;
  caption: string;
  imageUrl: string;
}

export default function Dashboard() {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const res = await fetch("/api/memories");
        if (res.ok) {
          const data = await res.json();
          setMemories(data);
        } else {
          console.error("Failed to fetch memories");
        }
      } catch (error) {
        console.error("Error fetching memories:", error);
      }
    };

    fetchMemories();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white pt-20">
      <Header />
      <div className="grid-animation"></div>
      <div className="memory-gallery">
        <h1 className="text-4xl font-bold mb-8">Your Memories</h1>
        <div className="memory-grid">
          {memories.length > 0 ? (
            memories.map((memory) => (
              <MemoryCard
                key={memory._id}
                title={memory.title}
                caption={memory.caption}
                imageUrl={memory.imageUrl}
              />
            ))
          ) : (
            <p className="text-center text-gray-400">No memories found. Start uploading!</p>
          )}
        </div>
      </div>
    </div>
  );
}
