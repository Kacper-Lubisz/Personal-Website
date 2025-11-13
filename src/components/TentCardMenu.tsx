"use client";

import { useState } from "react";
import PartyContentCard from "./PartyContentCard";

interface TentCardMenuProps {
  page1: React.ReactNode;
  page2: React.ReactNode;
}

export default function TentCardMenu({ page1, page2 }: TentCardMenuProps) {
  const [angle, setAngle] = useState(60); // Default 60 degrees for equilateral triangle

  // Calculate flap height based on geometry
  // Working in page heights as units (page height = 1)
  // Base width (chord) = 2 * sin(θ/2)
  // Flap should be proportional to chord length
  const calculateFlapHeight = (angleDeg: number) => {
    const thetaRad = (angleDeg * Math.PI) / 180;
    const baseWidth = 2 * Math.sin(thetaRad / 2);

    // Flap height as fraction of page height
    // Proportional to base width: smaller angle = smaller chord = smaller flap
    const flapFraction = baseWidth * 0.3; // Direct proportional relationship

    // Convert to pixels (assuming page ~400px in print)
    return Math.round(flapFraction * 400);
  };

  const flapHeight = calculateFlapHeight(angle);

  return (
    <>
      {/* Angle Control Panel - Desktop only, hover to reveal */}
      <div className="hidden md:block print:hidden fixed top-4 left-4 z-50">
        <div className="group">
          {/* Hover target area */}
          <div className="w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Control panel - appears on hover */}
          <div className="absolute top-0 left-0 bg-[var(--background)] border-2 border-current p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
            <div className="space-y-3">
              <label className="text-sm font-medium block">
                Tent Angle: {angle}°
              </label>

              {/* Visual tent angle diagram */}
              <div className="flex justify-center py-2">
                <svg
                  width="120"
                  height="100"
                  viewBox="0 0 120 100"
                  className="border border-current/20"
                >
                  {(() => {
                    const centerX = 60;
                    const apexY = 10;
                    const pageLength = 50; // 1 page height in SVG units
                    const thetaRad = (angle * Math.PI) / 180;

                    // Calculate page endpoints (sector geometry)
                    // Each page extends from apex at angle θ/2 from vertical
                    const leftX = centerX - pageLength * Math.sin(thetaRad / 2);
                    const rightX =
                      centerX + pageLength * Math.sin(thetaRad / 2);
                    const baseY = apexY + pageLength * Math.cos(thetaRad / 2);

                    // Chord length: 2 * sin(θ/2) in page height units
                    const chordLength = 2 * Math.sin(thetaRad / 2);

                    // Flap extends below
                    const flapInPageHeights = flapHeight / 400; // Convert back from pixels
                    const flapLengthSVG = flapInPageHeights * pageLength;
                    const flapY = baseY + flapLengthSVG;

                    return (
                      <>
                        {/* Left page */}
                        <line
                          x1={centerX}
                          y1={apexY}
                          x2={leftX}
                          y2={baseY}
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        {/* Right page */}
                        <line
                          x1={centerX}
                          y1={apexY}
                          x2={rightX}
                          y2={baseY}
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        {/* Chord (base) */}
                        <line
                          x1={leftX}
                          y1={baseY}
                          x2={rightX}
                          y2={baseY}
                          stroke="currentColor"
                          strokeWidth="1"
                          opacity="0.5"
                          strokeDasharray="2,2"
                        />
                        {/* Left flap */}
                        <line
                          x1={leftX}
                          y1={baseY}
                          x2={leftX}
                          y2={flapY}
                          stroke="currentColor"
                          strokeWidth="1"
                          opacity="0.3"
                          strokeDasharray="3,2"
                        />
                        {/* Right flap */}
                        <line
                          x1={rightX}
                          y1={baseY}
                          x2={rightX}
                          y2={flapY}
                          stroke="currentColor"
                          strokeWidth="1"
                          opacity="0.3"
                          strokeDasharray="3,2"
                        />
                        {/* Angle arc at apex */}
                        <path
                          d={`M ${centerX - 15 * Math.sin(thetaRad / 2)} ${
                            apexY + 15 * Math.cos(thetaRad / 2)
                          } A 15 15 0 0 1 ${centerX + 15 * Math.sin(thetaRad / 2)} ${
                            apexY + 15 * Math.cos(thetaRad / 2)
                          }`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          opacity="0.6"
                        />
                        {/* Angle label */}
                        <text
                          x={centerX}
                          y={apexY + 25}
                          textAnchor="middle"
                          fontSize="8"
                          fill="currentColor"
                          opacity="0.6"
                        >
                          {angle}°
                        </text>
                      </>
                    );
                  })()}
                </svg>
              </div>

              <input
                type="range"
                min="30"
                max="90"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-xs opacity-60">
                Flap height: {flapHeight}px
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Screen view: two pages stacked vertically */}
      <div className="print:hidden flex flex-col items-center gap-12">
        {/* Page 1 */}
        <PartyContentCard>{page1}</PartyContentCard>

        {/* Page 2 */}
        <PartyContentCard>{page2}</PartyContentCard>
      </div>

      {/* Print view: folding tent card layout */}
      <div className="hidden print:block print:min-h-screen print:flex print:flex-col print:justify-between">
        <div className="flex flex-col items-center">
          {/* Glue tab at top */}
          <div
            className="w-full border-t-2 border-b-2 border-dashed border-current opacity-50"
            style={{ height: `${flapHeight}px` }}
          />

          {/* Top half - page 2 upside down so header touches fold */}
          <div className="w-full py-12 rotate-180">{page2}</div>

          {/* Fold line where headers meet */}
          <div className="w-full relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-4 border-double border-current" />
            </div>
          </div>

          {/* Bottom half - page 1 normal orientation so header touches fold */}
          <div className="w-full py-12">{page1}</div>

          {/* Glue tab at bottom */}
          <div
            className="w-full border-t-2 border-b-2 border-dashed border-current opacity-50"
            style={{ height: `${flapHeight}px` }}
          />
        </div>
      </div>
    </>
  );
}
