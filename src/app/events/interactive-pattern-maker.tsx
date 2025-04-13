"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function InteractivePatternMaker({
  patterns,
  onSelectedPatternChange,
}: {
  patterns: number[][][];
  onSelectedPatternChange: (index: number | null) => void;
}) {
  // Define predefined patterns as 3x3 matrices (1 = filled, 0 = empty)

  // Current grid state
  const [grid, setGrid] = useState<number[][]>(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(0)),
  );

  const isEmpty = grid.every((row) => row.every((cell) => cell === 0));

  const [isHovered, setIsHovered] = useState(false);

  // Selected pattern index for highlighting
  const [selectedPatternIndex, setSelectedPatternIndex] = useState<
    number | null
  >(null);

  // Toggle a cell in the grid
  const toggleCell = (rowIndex: number, colIndex: number) => {
    const newGrid = [...grid];
    newGrid[rowIndex] = [...newGrid[rowIndex]];
    newGrid[rowIndex][colIndex] = newGrid[rowIndex][colIndex] ? 0 : 1;
    setGrid(newGrid);

    // Check if the new grid matches any predefined pattern
    const patternIndex = patterns.findIndex((pattern) =>
      pattern.every((row, r) => row.every((cell, c) => cell === newGrid[r][c])),
    );

    setSelectedPatternIndex(patternIndex !== -1 ? patternIndex : null);
  };

  // Apply a predefined pattern
  const applyPattern = (pattern: number[][], index: number) => {
    setGrid([...pattern.map((row) => [...row])]);
    setSelectedPatternIndex(index);
  };

  useEffect(() => {
    onSelectedPatternChange(selectedPatternIndex);
  }, [onSelectedPatternChange, selectedPatternIndex]);

  return (
    <div className="flex w-full max-w-3xl flex-col items-center">
      {/* Main grid */}
      <div className="mb-8">
        <div
          className="relative size-72"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="grid size-72 grid-cols-3 grid-rows-3 border border-neutral-700">
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`cursor-pointer border border-neutral-700 transition-colors duration-200 ${cell ? "bg-white" : "bg-transparent hover:bg-white/20"}`}
                  onClick={() => toggleCell(rowIndex, colIndex)}
                />
              )),
            )}
          </div>

          {/* Instruction text */}
          <AnimatePresence>
            {isEmpty && !isHovered && (
              <motion.div
                key="instruction"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                className="absolute top-0 left-0 flex size-full items-center justify-center"
              >
                <p className="pointer-events-none mt-2 text-center text-sm">
                  Make patterns with
                  <br />
                  the tiles!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Pattern selector */}
      <div className="flex space-x-4">
        {patterns.map((pattern, index) => (
          <button
            key={index}
            className={cn(
              `h-8 w-8 cursor-pointer border bg-black opacity-50 transition-all hover:opacity-75`,
              selectedPatternIndex === index && "opacity-100",
            )}
            onClick={() => applyPattern(pattern, index)}
            aria-label={`Pattern ${index + 1}`}
          >
            <div className="grid h-full w-full grid-cols-3 grid-rows-3">
              {pattern.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <div
                    key={`pattern-${index}-${rowIndex}-${colIndex}`}
                    className={`${cell ? "bg-white" : "bg-black"}`}
                  />
                )),
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
