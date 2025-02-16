"use client";

import { Edit, GripHorizontal, Trash } from "lucide-react";
import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { Toaster, toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

// Modal Component
const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (menuName: string) => void;
}> = ({ isOpen, onClose, onSubmit }) => {
  const [menuName, setMenuName] = useState("");

  const handleSubmit = () => {
    if (menuName.trim() === "") {
      toast.error("Menu name cannot be empty!");
      return;
    }
    onSubmit(menuName.trim());
    setMenuName("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-11/12 max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">Create Menu Group</h2>
        <input
          type="text"
          value={menuName}
          onChange={(e) => setMenuName(e.target.value)}
          placeholder="Menu Name"
          className="mb-4 w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-500 rounded px-4 py-2 focus:outline-none focus:ring-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

type MenuItem = {
  id: string;
  name: string;
  type: "page" | "custom";
  url?: string;
};

type Menu = {
  id: string;
  name: string;
  items: MenuItem[];
};

export default function MenuSettingTab() {
  const [menus, setMenus] = useState<Menu[]>([
    {
      id: "1",
      name: "Footer Menu",
      items: [
        { id: "1", name: "About Us", type: "page" },
        { id: "2", name: "Terms and Conditions", type: "page" },
      ],
    },
  ]);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [newItemName, setNewItemName] = useState("");
  const [newItemType, setNewItemType] = useState<"page" | "custom">("page");
  const [newItemUrl, setNewItemUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMenuSelect = (menuId: string) => {
    const menu = menus.find((m) => m.id === menuId) || null;
    setSelectedMenu(menu);
  };

  const handleCreateMenu = (menuName: string) => {
    const newMenu: Menu = {
      id: uuidv4(),
      name: menuName,
      items: [],
    };
    setMenus([...menus, newMenu]);
    setSelectedMenu(newMenu);
    toast.success(`Menu "${menuName}" created successfully!`);
    setIsModalOpen(false);
  };

  const handleAddMenuItem = () => {
    if (!selectedMenu || !newItemName.trim()) {
      toast.error("Item name cannot be empty!");
      return;
    }
    if (newItemType === "custom" && !newItemUrl.trim()) {
      toast.error("URL cannot be empty for custom links!");
      return;
    }

    const newItem: MenuItem = {
      id: uuidv4(),
      name: newItemName.trim(),
      type: newItemType,
      url: newItemType === "custom" ? newItemUrl.trim() : undefined,
    };
    const updatedMenu = {
      ...selectedMenu,
      items: [...selectedMenu.items, newItem],
    };
    setMenus(menus.map((m) => (m.id === selectedMenu.id ? updatedMenu : m)));
    setSelectedMenu(updatedMenu);
    toast.success(`Item "${newItem.name}" added to "${updatedMenu.name}"`);
    setNewItemName("");
    setNewItemType("page");
    setNewItemUrl("");
  };

  const handleRemoveMenuItem = (itemId: string) => {
    if (!selectedMenu) return;
    const itemToRemove = selectedMenu.items.find((item) => item.id === itemId);
    const updatedItems = selectedMenu.items.filter(
      (item) => item.id !== itemId,
    );
    const updatedMenu = { ...selectedMenu, items: updatedItems };
    setMenus(menus.map((m) => (m.id === selectedMenu.id ? updatedMenu : m)));
    setSelectedMenu(updatedMenu);
    toast.success(
      `Item "${itemToRemove?.name}" removed from "${updatedMenu.name}"`,
    );
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !selectedMenu) return;

    const items = Array.from(selectedMenu.items);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedMenu = { ...selectedMenu, items };
    setMenus(menus.map((m) => (m.id === selectedMenu.id ? updatedMenu : m)));
    setSelectedMenu(updatedMenu);
    toast.success(`Items reordered in "${updatedMenu.name}"`);
  };

  const handleMenuNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedMenu) return;
    const updatedMenu = { ...selectedMenu, name: e.target.value };
    setMenus(menus.map((m) => (m.id === selectedMenu.id ? updatedMenu : m)));
    setSelectedMenu(updatedMenu);
  };

  const handleSaveMenu = () => {
    // Implement save functionality (e.g., API call)
    toast.success("Menu saved successfully!");
  };

  const handleDeleteMenu = () => {
    if (!selectedMenu) return;
    const confirmed = window.confirm(
      `Are you sure you want to delete the menu "${selectedMenu.name}"?`,
    );
    if (confirmed) {
      const updatedMenus = menus.filter((m) => m.id !== selectedMenu.id);
      setMenus(updatedMenus);
      setSelectedMenu(null);
      toast.success(`Menu "${selectedMenu.name}" deleted successfully!`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster position="top-right" />
      <div className="mb-4 rounded bg-white p-5 shadow">
        <div className="flex w-full items-center justify-between gap-4 border-b border-slate-100 px-4 py-4">
          <h2 className="text-xl font-semibold">Menu Management</h2>

          <div className="flex w-full items-start justify-end sm:flex-row sm:items-center sm:space-x-2">
            <div className="relative">
              <input
                type="text"
                value={selectedMenu?.name || ""}
                onChange={handleMenuNameChange}
                placeholder="Menu Name"
                className="max-w-[200px] rounded border border-slate-300 px-3 py-2 pr-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Edit
                size={16}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer hover:text-blue-500"
              />

              {/* <Save size={16} className="text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer hover:text-blue-500" /> */}
            </div>
            <select
              value={selectedMenu?.id || ""}
              onChange={(e) => handleMenuSelect(e.target.value)}
              className="mb-2 rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:mb-0"
            >
              <option value="">Select a menu to edit</option>
              {menus.map((menu) => (
                <option key={menu.id} value={menu.id}>
                  {menu.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Menu Group
            </button>
          </div>
        </div>
        <div className="flex gap-4 p-4">
          {selectedMenu && (
            <div className="flex-1">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Add Menu Items */}
                <div className="rounded-lg bg-slate-50 p-4 shadow">
                  <h3 className="mb-2 text-lg font-semibold">Add Menu Items</h3>
                  <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="Item Name"
                    className="mb-2 w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <input
                    type="url"
                    value={newItemUrl}
                    onChange={(e) => setNewItemUrl(e.target.value)}
                    placeholder="URL"
                    className="mb-2 w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAddMenuItem}
                    className="mt-3 w-auto rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Add to Menu
                  </button>
                </div>

                {/* Menu Structure */}
                <div className="rounded-lg bg-slate-50 p-4 shadow">
                  <h3 className="mb-2 text-lg font-semibold">
                    Active Menu List
                  </h3>
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="menu-items">
                      {(provided) => (
                        <ul
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="space-y-2"
                        >
                          {selectedMenu.items.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`flex items-center justify-between rounded bg-white p-3 shadow ${
                                    snapshot.isDragging ? "bg-blue-100" : ""
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <GripHorizontal
                                      size={20}
                                      className="text-slate-400"
                                    />
                                    <span>{item.name}</span>
                                  </div>
                                  <Trash
                                    onClick={() =>
                                      handleRemoveMenuItem(item.id)
                                    }
                                    size={16}
                                    className="cursor-pointer text-danger"
                                  />
                                </li>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </ul>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={handleSaveMenu}
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save Menu
                </button>
                <button
                  onClick={handleDeleteMenu}
                  className="hover:bg-red-600 rounded bg-danger px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-danger"
                >
                  Delete Menu
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Menu Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateMenu}
      />
    </div>
  );
}
