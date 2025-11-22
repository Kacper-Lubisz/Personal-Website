"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import partiesData from "@/data/menus.json";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";

type Recipe = {
  name: string;
  color: string;
  ingredients: string[];
  method: string[];
};

export default function CookingPage() {
  const params = useParams();
  const id = params.id as string;
  const [currentIndex, setCurrentIndex] = useState(0);

  const party = partiesData.parties.find((p) => p.id === id);
  const recipes: Recipe[] =
    party?.menu?.type === "taco" && party.menu.recipes
      ? (party.menu.recipes as Recipe[])
      : [];

  const goToNext = useCallback(() => {
    if (recipes.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % recipes.length);
    }
  }, [recipes.length]);

  const goToPrev = useCallback(() => {
    if (recipes.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + recipes.length) % recipes.length);
    }
  }, [recipes.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        goToNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        goToPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  if (!party || recipes.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No recipes found</h1>
          <Link
            href={`/party/${id}/menu`}
            className="text-blue-500 hover:underline"
          >
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  const currentRecipe = recipes[currentIndex];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: currentRecipe.color,
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Navigation header */}
      <div className="flex items-center justify-between p-4 bg-black/20">
        <Link
          href={`/party/${id}/menu`}
          className="text-white/80 hover:text-white transition-colors text-sm"
        >
          ← Back to Menu
        </Link>
        <div className="text-white/80 text-sm">
          {currentIndex + 1} / {recipes.length}
        </div>
        <div className="text-white/60 text-xs">
          Use ← → arrow keys to navigate
        </div>
      </div>

      {/* Recipe content */}
      <div className="flex-1 flex flex-col p-6 md:p-12 overflow-auto">
        <div className="max-w-4xl mx-auto w-full">
          {/* Recipe title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 text-center drop-shadow-lg">
            {currentRecipe.name}
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Ingredients */}
            <div className="bg-white/95 rounded-lg p-6 shadow-xl text-black">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b-2 border-black">
                Ingredients
              </h2>
              <ul className="space-y-2">
                {currentRecipe.ingredients.map((ingredient, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Method */}
            <div className="bg-white/95 rounded-lg p-6 shadow-xl text-black">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b-2 border-black">
                Method
              </h2>
              <ol className="space-y-3">
                {currentRecipe.method.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between p-4 bg-black/20">
        <button
          onClick={goToPrev}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors px-4 py-2 rounded bg-black/20 hover:bg-black/40"
        >
          <ArrowLeft size={20} />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Recipe dots indicator */}
        <div className="flex gap-2">
          {recipes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to recipe ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors px-4 py-2 rounded bg-black/20 hover:bg-black/40"
        >
          <span className="hidden sm:inline">Next</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
