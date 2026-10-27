"use client";

import React, { Suspense, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Plus,
  Filter,
  LayoutGrid,
  List,
  Volume2,
  Trash2,
  Edit3,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { VocabularyCard } from "@/components/vocabulary/VocabularyCard";
import { VocabularyDetailModal } from "@/components/vocabulary/VocabularyDetailModal";
import { VocabularyFormModal } from "@/components/vocabulary/VocabularyFormModal";
import { EmptyState, LoadingState } from "@/components/ui/EmptyState";
import { VocabularyItem } from "@/types";
import { learningService } from "@/services/learning-service";
import { useToast } from "@/components/ui/ToastContext";
import { speakChinese } from "@/lib/utils";

function VocabularyContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams ? searchParams.get("q") || "" : "";

  const { showToast } = useToast();
  const [vocabList, setVocabList] = useState<VocabularyItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search State
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [selectedHsk, setSelectedHsk] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Modals state
  const [detailItem, setDetailItem] = useState<VocabularyItem | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<VocabularyItem | null>(null);

  useEffect(() => {
    let active = true;
    async function init() {
      const data = await learningService.getVocabulary();
      if (active) {
        setVocabList(data);
        setLoading(false);
      }
    }
    init();
    return () => {
      active = false;
    };
  }, []);

  // Filtered items
  const filteredList = useMemo(() => {
    return vocabList.filter((item) => {
      // Search matches hanzi, pinyin, or any meaning
      const query = searchTerm.toLowerCase().trim();
      const matchSearch =
        !query ||
        item.hanzi.includes(query) ||
        item.pinyin.toLowerCase().includes(query) ||
        item.meanings.some((m) => m.toLowerCase().includes(query));

      // HSK filter
      const matchHsk = selectedHsk === "ALL" || item.hskLevel === selectedHsk;

      // Status filter
      const matchStatus =
        selectedStatus === "ALL" || (item.status || "new") === selectedStatus;

      return matchSearch && matchHsk && matchStatus;
    });
  }, [vocabList, searchTerm, selectedHsk, selectedStatus]);

  // Handlers for Add/Edit/Delete
  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (item: VocabularyItem) => {
    setEditingItem(item);
    setFormOpen(true);
  };

  const handleSave = async (formData: Omit<VocabularyItem, "id">) => {
    try {
      if (editingItem) {
        const updated = await learningService.updateVocabulary(
          editingItem.id,
          formData
        );
        setVocabList((prev) =>
          prev.map((item) => (item.id === updated.id ? updated : item))
        );
        showToast({
          type: "success",
          title: "Đã cập nhật từ vựng",
          message: `Từ "${updated.hanzi}" đã được lưu thành công.`,
        });
      } else {
        const newItem = await learningService.addVocabulary(formData);
        setVocabList((prev) => [newItem, ...prev]);
        showToast({
          type: "success",
          title: "Thêm từ vựng mới",
          message: `Đã thêm "${newItem.hanzi}" vào kho từ vựng.`,
        });
      }
    } catch (e) {
      const err = e as Error;
      showToast({
        type: "error",
        title: "Lỗi lưu từ vựng",
        message: err.message,
      });
    }
  };

  const handleDelete = async (id: string) => {
    const item = vocabList.find((v) => v.id === id);
    if (!item) return;

    if (confirm(`Bạn có chắc chắn muốn xóa từ "${item.hanzi}"?`)) {
      await learningService.deleteVocabulary(id);
      setVocabList((prev) => prev.filter((v) => v.id !== id));
      showToast({
        type: "info",
        title: "Đã xóa từ vựng",
        message: `Đã xóa từ "${item.hanzi}" khỏi danh sách.`,
      });
    }
  };

  return (
    <AppShell
      title="Sổ từ vựng"
      subtitle="Quản lý và tra cứu các từ vựng tiếng Hán đã học"
    >
      <div className="space-y-6">
        {/* Top Controls: Search, Filters, Add Button */}
        <div className="glass-panel p-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#778198]" />
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm chữ Hán, phiên âm pinyin hoặc nghĩa tiếng Việt..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E3EAF4] rounded-xl text-xs md:text-sm text-[#202A3B] focus:outline-none focus:ring-2 focus:ring-[#4F83F1]/30 focus:border-[#4F83F1]"
              />
            </div>

            {/* Add Button */}
            <button
              type="button"
              onClick={handleOpenAdd}
              className="px-5 py-2.5 rounded-xl bg-[#4F83F1] hover:bg-[#3D72E3] text-white text-xs md:text-sm font-bold shadow-md shadow-[#4F83F1]/20 flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm từ mới</span>
            </button>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#E3EAF4]/80 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[#778198] font-medium flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Cấp độ:
              </span>
              {["ALL", "HSK 1", "HSK 2", "HSK 3", "HSK 4"].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedHsk(lvl)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    selectedHsk === lvl
                      ? "bg-[#315FC7] text-white font-bold"
                      : "bg-white text-[#778198] hover:text-[#202A3B] border border-[#E3EAF4]"
                  }`}
                >
                  {lvl === "ALL" ? "Tất cả" : lvl}
                </button>
              ))}

              <span className="text-[#778198] font-medium ml-2">Trạng thái:</span>
              {[
                { id: "ALL", label: "Tất cả" },
                { id: "new", label: "Mới" },
                { id: "learning", label: "Đang học" },
                { id: "mastered", label: "Đã thuộc" },
                { id: "review", label: "Cần ôn" },
              ].map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setSelectedStatus(st.id)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    selectedStatus === st.id
                      ? "bg-[#4F83F1] text-white font-bold"
                      : "bg-white text-[#778198] hover:text-[#202A3B] border border-[#E3EAF4]"
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>

            {/* View switcher: Grid vs Table */}
            <div className="flex items-center gap-1 bg-[#F5F9FF] p-1 rounded-xl border border-[#E3EAF4]">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-white text-[#315FC7] shadow-xs"
                    : "text-[#778198]"
                }`}
                aria-label="Xem dạng lưới"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "table"
                    ? "bg-white text-[#315FC7] shadow-xs"
                    : "text-[#778198]"
                }`}
                aria-label="Xem dạng bảng"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content list */}
        {loading ? (
          <LoadingState message="Đang tải danh sách từ vựng..." />
        ) : filteredList.length === 0 ? (
          <EmptyState
            title="Không tìm thấy từ vựng phù hợp"
            description="Hãy thử thay đổi từ khóa tìm kiếm hoặc chọn bộ lọc cấp độ khác."
            action={{
              label: "Xóa bộ lọc",
              onClick: () => {
                setSearchTerm("");
                setSelectedHsk("ALL");
                setSelectedStatus("ALL");
              },
            }}
          />
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in">
            {filteredList.map((item) => (
              <VocabularyCard
                key={item.id}
                item={item}
                onClick={(it) => setDetailItem(it)}
                onEdit={(it) => handleOpenEdit(it)}
                onDelete={(id) => handleDelete(id)}
              />
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="glass-card overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs md:text-sm">
                <thead className="bg-[#F5F9FF] border-b border-[#E3EAF4] text-[#778198] font-semibold">
                  <tr>
                    <th className="py-3 px-4">Chữ Hán</th>
                    <th className="py-3 px-4">Phiên âm Pinyin</th>
                    <th className="py-3 px-4">Nghĩa tiếng Việt</th>
                    <th className="py-3 px-4">Cấp độ</th>
                    <th className="py-3 px-4">Trạng thái</th>
                    <th className="py-3 px-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E3EAF4]">
                  {filteredList.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => setDetailItem(item)}
                      className="hover:bg-[#F5F9FF]/80 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4 font-chinese text-xl font-bold text-[#202A3B]">
                        {item.hanzi}
                      </td>
                      <td className="py-3 px-4 font-pinyin text-[#4F83F1] font-semibold">
                        {item.pinyin}
                      </td>
                      <td className="py-3 px-4 text-[#202A3B] font-medium">
                        {item.meanings.join(", ")}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAF4FF] text-[#315FC7]">
                          {item.hskLevel || "HSK"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#F5F9FF] text-[#778198]">
                          {item.status || "Mới"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div
                          className="flex items-center justify-end gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => speakChinese(item.hanzi)}
                            className="p-1 rounded text-[#4F83F1] hover:bg-[#EAF4FF]"
                            title="Phát âm"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(item)}
                            className="p-1 rounded text-[#778198] hover:text-[#4F83F1]"
                            title="Chỉnh sửa"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            className="p-1 rounded text-[#778198] hover:text-[#D95D67]"
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <VocabularyDetailModal
        item={detailItem}
        onClose={() => setDetailItem(null)}
        onEdit={(it) => handleOpenEdit(it)}
      />

      {/* Add / Edit Form Modal */}
      <VocabularyFormModal
        isOpen={formOpen}
        initialData={editingItem}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
      />
    </AppShell>
  );
}

export default function VocabularyPage() {
  return (
    <Suspense
      fallback={
        <AppShell title="Đang tải từ vựng...">
          <LoadingState message="Đang nạp sổ từ vựng..." />
        </AppShell>
      }
    >
      <VocabularyContent />
    </Suspense>
  );
}
