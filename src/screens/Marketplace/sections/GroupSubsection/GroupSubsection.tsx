import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../../components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

export const GroupSubsection = (): JSX.Element => {
  // Data for pagination
  const paginationData = {
    currentPage: 1,
    totalPages: 20,
    totalEntries: 430,
    entriesPerPage: 13,
    visiblePages: [1, 2, 3],
  };

  return (
    <div className="w-full py-6 flex flex-col">
      <div className="flex justify-between items-center">
        {/* Enhanced Entries display section */}
        <div className="flex items-center gap-3">
          <span className="font-['Rajdhani',Helvetica] font-semibold text-base text-white">
            Showing
          </span>

          <Select defaultValue={paginationData.entriesPerPage.toString()}>
            <SelectTrigger className="h-10 px-4 py-2 bg-[#ffffff08] border-[#ffffff12] rounded-xl text-white hover:bg-[#ffffff12] hover:border-[#30bdee] transition-all min-w-[80px]">
              <SelectValue className="font-['Rajdhani',Helvetica] font-semibold text-white" />
            </SelectTrigger>
            <SelectContent className="bg-[#111111] border-[#ffffff12]">
              <SelectItem value="10" className="text-white hover:bg-[#ffffff12]">10</SelectItem>
              <SelectItem value="13" className="text-white hover:bg-[#ffffff12]">13</SelectItem>
              <SelectItem value="20" className="text-white hover:bg-[#ffffff12]">20</SelectItem>
              <SelectItem value="50" className="text-white hover:bg-[#ffffff12]">50</SelectItem>
            </SelectContent>
          </Select>

          <span className="font-['Rajdhani',Helvetica] font-semibold text-base text-white">
            of <span className="text-[#30bdee] font-bold">{paginationData.totalEntries.toLocaleString()}</span> items
          </span>
        </div>

        {/* Enhanced Pagination controls */}
        <Pagination>
          <PaginationContent className="flex items-center justify-center gap-2">
            <PaginationItem>
              <PaginationPrevious className="px-4 py-2 bg-[#ffffff08] border border-[#ffffff12] rounded-xl text-white hover:bg-[#ffffff12] hover:border-[#30bdee] transition-all" />
            </PaginationItem>

            {paginationData.visiblePages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  className={`px-4 py-2 rounded-xl font-['Rajdhani',Helvetica] font-bold text-base transition-all ${
                    page === paginationData.currentPage
                      ? "bg-[#30bdee] text-white shadow-lg shadow-[#30bdee]/25"
                      : "bg-[#ffffff08] border border-[#ffffff12] text-white hover:bg-[#ffffff12] hover:border-[#30bdee]"
                  }`}
                  isActive={page === paginationData.currentPage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationEllipsis className="px-4 py-2 bg-[#ffffff08] border border-[#ffffff12] rounded-xl text-white" />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink className="px-4 py-2 bg-[#ffffff08] border border-[#ffffff12] rounded-xl font-['Rajdhani',Helvetica] font-bold text-base text-white hover:bg-[#ffffff12] hover:border-[#30bdee] transition-all">
                {paginationData.totalPages}
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext className="px-4 py-2 bg-[#ffffff08] border border-[#ffffff12] rounded-xl text-white hover:bg-[#ffffff12] hover:border-[#30bdee] transition-all" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};