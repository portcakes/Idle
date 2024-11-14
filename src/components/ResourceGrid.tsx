import React, { useState } from "react";
import { Resource } from "../types/game";
import { ResourceDisplay } from "./ResourceDisplay";
import { ChevronUp, ChevronDown } from "lucide-react";

interface ResourceGridProps {
  resources: Record<string, Resource[]>;
}

export const ResourceGrid: React.FC<ResourceGridProps> = ({ resources }) => {
  const [isVisible, setIsVisible] = useState(true);

  const containerHeight = isVisible ? "h-[50vh]" : "h-0";

  return (
    <div
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${containerHeight}`}
    >
      {isVisible && (
        <div className="bg-black/30 backdrop-blur-sm p-4 h-full overflow-y-auto">
          <div className="space-y-8">
            {Object.entries(resources).map(
              ([category, categoryResources]) =>
                Array.isArray(categoryResources) &&
                categoryResources.length > 0 && (
                  <div key={category}>
                    <h3 className="text-xl font-semibold mb-3 capitalize">
                      {category.replace("_", " ")}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {categoryResources.map((resource) => (
                        <ResourceDisplay
                          key={resource.name}
                          resource={resource}
                        />
                      ))}
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      )}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="absolute left-1/2 -translate-x-1/2 -bottom-8 bg-black/30 backdrop-blur-sm p-2 rounded-b-lg"
      >
        {isVisible ? (
          <ChevronUp size={20} className="text-white" />
        ) : (
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-white">Resources</p>
            <ChevronDown size={20} className="text-white" />
          </div>
        )}
      </button>
    </div>
  );
};
