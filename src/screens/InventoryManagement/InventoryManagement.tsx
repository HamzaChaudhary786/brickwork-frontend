import { SearchIcon, FilterIcon, PlusIcon, EditIcon, TrashIcon, XIcon, ChevronDownIcon } from "lucide-react";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import { DeleteConfirmationModal } from "../../components/ui/delete-confirmation-modal";

export const InventoryManagement = (): JSX.Element => {
  const [showItemModal, setShowItemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGameType, setSelectedGameType] = useState("all");
  const [selectedStock, setSelectedStock] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    gameType: "Default",
    quantity: "",
    price: "",
    coins: "",
    stock: "In Stock",
    image: "⚔️"
  });

  // Inventory items data
  const inventoryItems = [
    {
      id: 1,
      name: "Armored Knight",
      description: "High-quality gaming product designed function-packed gameplay",
      gameType: "Squad",
      quantity: 16,
      price: 34,
      coins: 130,
      stock: "In Stock",
      image: "⚔️",
      bgColor: "from-gray-600 to-gray-700"
    },
    {
      id: 2,
      name: "Chibbi Warrior",
      description: "High-Quality Gaming Product Designed Function-Packed Gameplay",
      gameType: "Dune",
      quantity: 12,
      price: 40,
      coins: 140,
      stock: "In Stock",
      image: "🥷",
      bgColor: "from-red-600 to-red-700"
    },
    {
      id: 3,
      name: "Black Armor",
      description: "High-quality gaming product designed function-packed gameplay",
      gameType: "Squad",
      quantity: 14,
      price: 48,
      coins: 140,
      stock: "Low Stock",
      image: "🖤",
      bgColor: "from-gray-800 to-black"
    },
    {
      id: 4,
      name: "Viking Toy",
      description: "High-quality gaming product designed function-packed gameplay",
      gameType: "Squad",
      quantity: 8,
      price: 34,
      coins: 130,
      stock: "In Stock",
      image: "⚡",
      bgColor: "from-orange-600 to-orange-700"
    },
    {
      id: 5,
      name: "Medieval Knight",
      description: "High-quality gaming product designed function-packed gameplay",
      gameType: "Physical Merch",
      quantity: 9,
      price: 20,
      coins: 20,
      stock: "Out of Stock",
      image: "🛡️",
      bgColor: "from-orange-500 to-red-600"
    },
    {
      id: 6,
      name: "Golden Armored",
      description: "High-quality gaming product designed function-packed gameplay",
      gameType: "Star Citizen",
      quantity: 16,
      price: 19,
      coins: 10,
      stock: "Low Stock",
      image: "👑",
      bgColor: "from-yellow-600 to-yellow-700"
    },
    {
      id: 7,
      name: "Golden Armored Knight",
      description: "High-quality gaming product designed function-packed gameplay",
      gameType: "Star Citizen",
      quantity: 22,
      price: 24,
      coins: 100,
      stock: "In Stock",
      image: "👑",
      bgColor: "from-yellow-600 to-yellow-700"
    }
  ];

  // Filter items based on search term, game type, and stock
  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGameType = selectedGameType === "all" || item.gameType === selectedGameType;
    const matchesStock = selectedStock === "all" || item.stock === selectedStock;
    return matchesSearch && matchesGameType && matchesStock;
  });

  // Get unique game types and stock statuses for filter dropdowns
  const gameTypes = ["all", ...Array.from(new Set(inventoryItems.map(item => item.gameType)))];
  const stockStatuses = ["all", ...Array.from(new Set(inventoryItems.map(item => item.stock)))];

  const getStockColor = (stock: string) => {
    switch (stock) {
      case 'In Stock':
        return 'text-green-400';
      case 'Low Stock':
        return 'text-yellow-400';
      case 'Out of Stock':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const handleEditItem = (item: any) => {
    setSelectedItem(item);
    setEditingItem({ ...item });
    setShowItemModal(true);
  };

  const handleDeleteClick = (item: any) => {
    setDeleteItem(item);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteItem) return;
    
    setIsDeleting(true);
    
    // Simulate delete operation
    setTimeout(() => {
      console.log(`Deleting item: ${deleteItem.name} (ID: ${deleteItem.id})`);
      setIsDeleting(false);
      setShowDeleteModal(false);
      setDeleteItem(null);
      // Here you would typically update your data state to remove the deleted item
    }, 2000);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDeleteItem(null);
  };

  const handleCloseModal = () => {
    setShowItemModal(false);
    setSelectedItem(null);
    setEditingItem(null);
  };

  const handleSaveChanges = () => {
    // Here you would typically update the item in your data store
    console.log("Saving changes:", editingItem);
    setShowItemModal(false);
    setSelectedItem(null);
    setEditingItem(null);
  };

  const updateEditingItem = (field: string, value: any) => {
    setEditingItem({ ...editingItem, [field]: value });
  };

  const handleAddNewItem = () => {
    setShowAddItemModal(true);
  };

  const handleCloseAddItemModal = () => {
    setShowAddItemModal(false);
    setNewItem({
      name: "",
      description: "",
      gameType: "Default",
      quantity: "",
      price: "",
      coins: "",
      stock: "In Stock",
      image: "⚔️"
    });
  };

  const handleSaveNewItem = () => {
    // Here you would typically add the new item to your data store
    console.log("Adding new item:", newItem);
    setShowAddItemModal(false);
    setNewItem({
      name: "",
      description: "",
      gameType: "Default",
      quantity: "",
      price: "",
      coins: "",
      stock: "In Stock",
      image: "⚔️"
    });
  };

  const updateNewItem = (field: string, value: any) => {
    setNewItem({ ...newItem, [field]: value });
  };

  return (
    <div className="relative">
      {/* Main Content */}
      <div className={`p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 bg-[#0a0a0a] min-h-screen transition-all duration-300 ${(showItemModal || showAddItemModal) ? 'blur-sm' : ''}`}>
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-white text-2xl sm:text-3xl lg:text-[32px] tracking-[-0.32px] leading-tight lg:leading-[51.2px] font-['Rajdhani',Helvetica] font-semibold mb-2">
            Inventory Management
          </h1>
          <p className="font-['Rajdhani',Helvetica] font-medium text-[#ffffffb2] text-sm sm:text-base tracking-[-0.16px] leading-relaxed lg:leading-[25.6px]">
            Manage Your Store Inventory, One Item At A Time
          </p>
        </div>

        {/* Search and Filter Bar - Updated with separate filter dropdowns */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 lg:gap-6 mb-6 lg:mb-8">
          {/* Search Item */}
          <div className="relative flex-1 max-w-full lg:max-w-md">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 sm:h-12 bg-[#1a1a1a] border-[#333333] rounded-lg pl-10 sm:pl-12 pr-4 font-['Rajdhani',Helvetica] font-medium text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#222222] transition-all text-sm sm:text-base"
              placeholder="Search Item"
            />
            <SearchIcon className="absolute w-4 h-4 sm:w-5 sm:h-5 top-3 sm:top-3.5 left-3 sm:left-4 text-[#ffffffb2]" />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            {/* Game Type Filter Dropdown */}
            <Select value={selectedGameType} onValueChange={setSelectedGameType}>
              <SelectTrigger className="h-10 sm:h-12 px-4 sm:px-6 py-3 bg-[#1a1a1a] border border-[#333333] rounded-lg flex items-center gap-3 hover:bg-[#222222] hover:border-[#30bdee] transition-all text-white min-w-[160px]">
                <FilterIcon className="w-4 h-4 text-[#ffffffb2]" />
                <SelectValue placeholder="Game Type" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-[#333333]">
                {gameTypes.map((gameType) => (
                  <SelectItem 
                    key={gameType} 
                    value={gameType} 
                    className="text-white hover:bg-[#333333]"
                  >
                    {gameType === "all" ? "All Game Types" : gameType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Stock Filter Dropdown */}
            <Select value={selectedStock} onValueChange={setSelectedStock}>
              <SelectTrigger className="h-10 sm:h-12 px-4 sm:px-6 py-3 bg-[#1a1a1a] border border-[#333333] rounded-lg flex items-center gap-3 hover:bg-[#222222] hover:border-[#30bdee] transition-all text-white min-w-[140px]">
                <FilterIcon className="w-4 h-4 text-[#ffffffb2]" />
                <SelectValue placeholder="Stock Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-[#333333]">
                {stockStatuses.map((stock) => (
                  <SelectItem 
                    key={stock} 
                    value={stock} 
                    className="text-white hover:bg-[#333333]"
                  >
                    {stock === "all" ? "All Stock Status" : stock}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Add New Items Button */}
            <Button 
              onClick={handleAddNewItem}
              className="h-10 sm:h-12 px-4 sm:px-6 bg-transparent border border-[#00cfff] text-[#00cfff] hover:bg-[#00cfff]/10 rounded-lg font-semibold transition-colors"
            >
              <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Add New Items
            </Button>
          </div>
        </div>

        {/* Results Count - Updated to show active filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="text-[#ffffffb2] text-sm">
            Showing {filteredItems.length} of {inventoryItems.length} items
            {searchTerm && ` for "${searchTerm}"`}
            {selectedGameType !== "all" && ` in ${selectedGameType}`}
            {selectedStock !== "all" && ` with ${selectedStock}`}
          </div>
          
          {/* Clear Filters Button */}
          {(searchTerm || selectedGameType !== "all" || selectedStock !== "all") && (
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedGameType("all");
                setSelectedStock("all");
              }}
              variant="ghost"
              className="text-[#30bdee] hover:text-white text-sm"
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Inventory Table */}
        <Card className="bg-[#111111] border-[#333333]">
          <CardContent className="p-0">
            {/* Desktop Table Header */}
            <div className="hidden lg:grid grid-cols-8 gap-4 p-4 sm:p-6 bg-[#ffffff06] text-[#ffffffb2] text-sm font-medium border-b border-[#333333]">
              <div>Item</div>
              <div>Description</div>
              <div>Game Type</div>
              <div>Quantity</div>
              <div>Price</div>
              <div>Coins</div>
              <div>Stock</div>
              <div>Action</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-[#333333]">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-[#ffffffb2] text-lg">No items found</p>
                  <p className="text-[#ffffffb2] text-sm mt-2">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              ) : (
                filteredItems.map((item) => (
                  <div key={item.id} className="lg:grid lg:grid-cols-8 lg:gap-4 p-4 sm:p-6 lg:items-center hover:bg-[#ffffff03] transition-colors">
                    {/* Mobile Card Layout */}
                    <div className="lg:hidden space-y-4">
                      {/* Item Header */}
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${item.bgColor} rounded-lg flex items-center justify-center`}>
                          <span className="text-white text-xl">{item.image}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-base">{item.name}</h3>
                          <p className="text-[#ffffffb2] text-sm">{item.description}</p>
                        </div>
                      </div>

                      {/* Item Details Grid */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-[#ffffffb2]">Game Type:</span>
                          <p className="text-white font-medium">{item.gameType}</p>
                        </div>
                        <div>
                          <span className="text-[#ffffffb2]">Quantity:</span>
                          <p className="text-white font-medium">{item.quantity}</p>
                        </div>
                        <div>
                          <span className="text-[#ffffffb2]">Price:</span>
                          <p className="text-white font-medium">${item.price}</p>
                        </div>
                        <div>
                          <span className="text-[#ffffffb2]">Coins:</span>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-[#30bdee] rounded-full" />
                            <span className="text-white font-medium">{item.coins}</span>
                          </div>
                        </div>
                      </div>

                      {/* Stock and Actions */}
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${getStockColor(item.stock)}`}>
                          {item.stock}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEditItem(item)}
                            size="sm"
                            variant="ghost"
                            className="text-[#30bdee] hover:text-white hover:bg-[#30bdee]/20 p-2"
                          >
                            <EditIcon className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteClick(item)}
                            size="sm"
                            variant="ghost"
                            className="text-red-400 hover:text-white hover:bg-red-400/20 p-2"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Grid Layout */}
                    <div className="hidden lg:contents">
                      {/* Item */}
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${item.bgColor} rounded-lg flex items-center justify-center`}>
                          <span className="text-white text-xl">{item.image}</span>
                        </div>
                        <span className="text-white font-medium">{item.name}</span>
                      </div>

                      {/* Description */}
                      <div className="text-[#ffffffb2] text-sm">{item.description}</div>

                      {/* Game Type */}
                      <div className="text-white text-sm">{item.gameType}</div>

                      {/* Quantity */}
                      <div className="text-white text-sm font-medium">{item.quantity}</div>

                      {/* Price */}
                      <div className="text-white text-sm font-medium">${item.price}</div>

                      {/* Coins */}
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-[#30bdee] rounded-full" />
                        <span className="text-white text-sm font-medium">{item.coins}</span>
                      </div>

                      {/* Stock */}
                      <div className={`text-sm font-medium ${getStockColor(item.stock)}`}>
                        {item.stock}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleEditItem(item)}
                          size="sm"
                          variant="ghost"
                          className="text-[#30bdee] hover:text-white hover:bg-[#30bdee]/20 p-2"
                        >
                          <EditIcon className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteClick(item)}
                          size="sm"
                          variant="ghost"
                          className="text-red-400 hover:text-white hover:bg-red-400/20 p-2"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="bg-[#1a1a1a] rounded-2xl border border-[#333333] p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Entries display section */}
            <div className="flex items-center gap-3">
              <span className="font-['Rajdhani',Helvetica] font-semibold text-sm sm:text-base text-white">
                Showing
              </span>

              <Select defaultValue="15">
                <SelectTrigger className="h-8 sm:h-10 px-3 sm:px-4 py-2 bg-[#ffffff08] border-[#ffffff12] rounded-xl text-white hover:bg-[#ffffff12] hover:border-[#30bdee] transition-all min-w-[60px] sm:min-w-[80px]">
                  <SelectValue className="font-['Rajdhani',Helvetica] font-semibold text-white" />
                </SelectTrigger>
                <SelectContent className="bg-[#111111] border-[#ffffff12]">
                  <SelectItem value="10" className="text-white hover:bg-[#ffffff12]">10</SelectItem>
                  <SelectItem value="15" className="text-white hover:bg-[#ffffff12]">15</SelectItem>
                  <SelectItem value="20" className="text-white hover:bg-[#ffffff12]">20</SelectItem>
                  <SelectItem value="50" className="text-white hover:bg-[#ffffff12]">50</SelectItem>
                </SelectContent>
              </Select>

              <span className="font-['Rajdhani',Helvetica] font-semibold text-sm sm:text-base text-white">
                Entries of <span className="text-[#30bdee] font-bold">{filteredItems.length}</span>
              </span>
            </div>

            {/* Pagination controls */}
            <Pagination>
              <PaginationContent className="flex items-center justify-center gap-1 sm:gap-2">
                <PaginationItem>
                  <PaginationPrevious className="px-2 sm:px-4 py-2 bg-[#ffffff08] border border-[#ffffff12] rounded-xl text-white hover:bg-[#ffffff12] hover:border-[#30bdee] transition-all text-xs sm:text-sm" />
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink
                    className="px-2 sm:px-4 py-2 rounded-xl font-['Rajdhani',Helvetica] font-bold text-sm sm:text-base transition-all bg-[#30bdee] text-white shadow-lg shadow-[#30bdee]/25"
                    isActive={true}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink className="px-2 sm:px-4 py-2 bg-[#ffffff08] border border-[#ffffff12] rounded-xl font-['Rajdhani',Helvetica] font-bold text-sm sm:text-base text-white hover:bg-[#ffffff12] hover:border-[#30bdee] transition-all">
                    2
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink className="px-2 sm:px-4 py-2 bg-[#ffffff08] border border-[#ffffff12] rounded-xl font-['Rajdhani',Helvetica] font-bold text-sm sm:text-base text-white hover:bg-[#ffffff12] hover:border-[#30bdee] transition-all">
                    3
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationEllipsis className="px-2 sm:px-4 py-2 bg-[#ffffff08] border border-[#ffffff12] rounded-xl text-white text-xs sm:text-sm" />
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink className="px-2 sm:px-4 py-2 bg-[#ffffff08] border border-[#ffffff12] rounded-xl font-['Rajdhani',Helvetica] font-bold text-sm sm:text-base text-white hover:bg-[#ffffff12] hover:border-[#30bdee] transition-all">
                    20
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext className="px-2 sm:px-4 py-2 bg-[#ffffff08] border border-[#ffffff12] rounded-xl text-white hover:bg-[#ffffff12] hover:border-[#30bdee] transition-all text-xs sm:text-sm" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>

      {/* Item Details Modal */}
      {showItemModal && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCloseModal}
          />
          
          {/* Modal */}
          <div className="relative bg-[#111111] w-full max-w-2xl rounded-2xl border border-[#333333] p-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-xl font-bold">Item Details</h3>
              <Button
                variant="ghost"
                onClick={handleCloseModal}
                className="text-[#ffffffb2] hover:text-white p-2"
              >
                <XIcon className="w-5 h-5" />
              </Button>
            </div>

            {/* Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Side - Item Image */}
              <div className="flex flex-col items-center">
                <div className={`w-32 h-32 bg-gradient-to-br ${selectedItem.bgColor} rounded-2xl flex items-center justify-center mb-4`}>
                  <span className="text-white text-4xl">{selectedItem.image}</span>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-[#333333] text-[#ffffffb2] hover:text-white hover:bg-[#ffffff12] rounded-lg text-sm"
                >
                  Change Image
                </Button>
              </div>

              {/* Right Side - Form Fields */}
              <div className="space-y-4">
                {/* Item Name */}
                <div>
                  <label className="text-[#ffffffb2] text-sm block mb-2">Item Name</label>
                  <Input
                    type="text"
                    value={editingItem?.name || ''}
                    onChange={(e) => updateEditingItem('name', e.target.value)}
                    className="h-10 bg-[#0a0a0a] border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#111111] transition-all text-sm"
                  />
                </div>

                {/* Price and Coin Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#ffffffb2] text-sm block mb-2">Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ffffffb2] text-sm">$</span>
                      <Input
                        type="number"
                        value={editingItem?.price || ''}
                        onChange={(e) => updateEditingItem('price', e.target.value)}
                        className="h-10 bg-[#0a0a0a] border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#111111] transition-all text-sm pl-8"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[#ffffffb2] text-sm block mb-2">Coin</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[#30bdee] rounded-full" />
                      <Input
                        type="number"
                        value={editingItem?.coins || ''}
                        onChange={(e) => updateEditingItem('coins', e.target.value)}
                        className="h-10 bg-[#0a0a0a] border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#111111] transition-all text-sm pl-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="text-[#ffffffb2] text-sm block mb-2">Quantity</label>
                  <Input
                    type="number"
                    value={editingItem?.quantity || ''}
                    onChange={(e) => updateEditingItem('quantity', e.target.value)}
                    className="h-10 bg-[#0a0a0a] border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#111111] transition-all text-sm"
                  />
                </div>

                {/* Game Type and Stock Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#ffffffb2] text-sm block mb-2">Game Type</label>
                    <Select 
                      value={editingItem?.gameType || 'Default'} 
                      onValueChange={(value) => updateEditingItem('gameType', value)}
                    >
                      <SelectTrigger className="h-10 bg-[#0a0a0a] border-[#333333] rounded-lg text-white hover:bg-[#111111] hover:border-[#30bdee] transition-all text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111111] border-[#333333]">
                        <SelectItem value="Squad" className="text-white hover:bg-[#333333]">Squad</SelectItem>
                        <SelectItem value="Dune" className="text-white hover:bg-[#333333]">Dune</SelectItem>
                        <SelectItem value="Physical Merch" className="text-white hover:bg-[#333333]">Physical Merch</SelectItem>
                        <SelectItem value="Star Citizen" className="text-white hover:bg-[#333333]">Star Citizen</SelectItem>
                        <SelectItem value="Default" className="text-white hover:bg-[#333333]">Default</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-[#ffffffb2] text-sm block mb-2">Stock</label>
                    <Select 
                      value={editingItem?.stock || 'Default'} 
                      onValueChange={(value) => updateEditingItem('stock', value)}
                    >
                      <SelectTrigger className="h-10 bg-[#0a0a0a] border-[#333333] rounded-lg text-white hover:bg-[#111111] hover:border-[#30bdee] transition-all text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111111] border-[#333333]">
                        <SelectItem value="In Stock" className="text-white hover:bg-[#333333]">In Stock</SelectItem>
                        <SelectItem value="Low Stock" className="text-white hover:bg-[#333333]">Low Stock</SelectItem>
                        <SelectItem value="Out of Stock" className="text-white hover:bg-[#333333]">Out of Stock</SelectItem>
                        <SelectItem value="Default" className="text-white hover:bg-[#333333]">Default</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <label className="text-[#ffffffb2] text-sm block mb-2">Description</label>
              <textarea
                value={editingItem?.description || ''}
                onChange={(e) => updateEditingItem('description', e.target.value)}
                className="w-full h-20 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#111111] transition-all text-sm p-3 resize-none"
                placeholder="Add item description..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <Button
                onClick={handleCloseModal}
                variant="outline"
                className="flex-1 border-[#333333] text-[#ffffffb2] hover:text-white hover:bg-[#ffffff12] rounded-lg"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveChanges}
                className="flex-1 bg-[#30bdee] hover:bg-[#2aa3d1] text-white rounded-lg"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Item Modal */}
      {showAddItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCloseAddItemModal}
          />
          
          {/* Modal */}
          <div className="relative bg-[#111111] w-full max-w-2xl rounded-2xl border border-[#333333] p-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-xl font-bold">Add New Item</h3>
              <Button
                variant="ghost"
                onClick={handleCloseAddItemModal}
                className="text-[#ffffffb2] hover:text-white p-2"
              >
                <XIcon className="w-5 h-5" />
              </Button>
            </div>

            {/* Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Side - Item Image */}
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-white text-4xl">{newItem.image}</span>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-[#333333] text-[#ffffffb2] hover:text-white hover:bg-[#ffffff12] rounded-lg text-sm"
                >
                  Choose File
                </Button>
              </div>

              {/* Right Side - Form Fields */}
              <div className="space-y-4">
                {/* Item Name */}
                <div>
                  <label className="text-[#ffffffb2] text-sm block mb-2">Item Name</label>
                  <Input
                    type="text"
                    value={newItem.name}
                    onChange={(e) => updateNewItem('name', e.target.value)}
                    className="h-10 bg-[#0a0a0a] border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#111111] transition-all text-sm"
                    placeholder="Enter item name"
                  />
                </div>

                {/* Price and Coin Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#ffffffb2] text-sm block mb-2">Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ffffffb2] text-sm">$</span>
                      <Input
                        type="number"
                        value={newItem.price}
                        onChange={(e) => updateNewItem('price', e.target.value)}
                        className="h-10 bg-[#0a0a0a] border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#111111] transition-all text-sm pl-8"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[#ffffffb2] text-sm block mb-2">Coin</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[#30bdee] rounded-full" />
                      <Input
                        type="number"
                        value={newItem.coins}
                        onChange={(e) => updateNewItem('coins', e.target.value)}
                        className="h-10 bg-[#0a0a0a] border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#111111] transition-all text-sm pl-10"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="text-[#ffffffb2] text-sm block mb-2">Quantity</label>
                  <Input
                    type="number"
                    value={newItem.quantity}
                    onChange={(e) => updateNewItem('quantity', e.target.value)}
                    className="h-10 bg-[#0a0a0a] border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#111111] transition-all text-sm"
                    placeholder="0"
                  />
                </div>

                {/* Game Type and Stock Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#ffffffb2] text-sm block mb-2">Game Type</label>
                    <Select 
                      value={newItem.gameType} 
                      onValueChange={(value) => updateNewItem('gameType', value)}
                    >
                      <SelectTrigger className="h-10 bg-[#0a0a0a] border-[#333333] rounded-lg text-white hover:bg-[#111111] hover:border-[#30bdee] transition-all text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111111] border-[#333333]">
                        <SelectItem value="Squad" className="text-white hover:bg-[#333333]">Squad</SelectItem>
                        <SelectItem value="Dune" className="text-white hover:bg-[#333333]">Dune</SelectItem>
                        <SelectItem value="Physical Merch" className="text-white hover:bg-[#333333]">Physical Merch</SelectItem>
                        <SelectItem value="Star Citizen" className="text-white hover:bg-[#333333]">Star Citizen</SelectItem>
                        <SelectItem value="Default" className="text-white hover:bg-[#333333]">Default</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-[#ffffffb2] text-sm block mb-2">Stock</label>
                    <Select 
                      value={newItem.stock} 
                      onValueChange={(value) => updateNewItem('stock', value)}
                    >
                      <SelectTrigger className="h-10 bg-[#0a0a0a] border-[#333333] rounded-lg text-white hover:bg-[#111111] hover:border-[#30bdee] transition-all text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111111] border-[#333333]">
                        <SelectItem value="In Stock" className="text-white hover:bg-[#333333]">In Stock</SelectItem>
                        <SelectItem value="Low Stock" className="text-white hover:bg-[#333333]">Low Stock</SelectItem>
                        <SelectItem value="Out of Stock" className="text-white hover:bg-[#333333]">Out of Stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <label className="text-[#ffffffb2] text-sm block mb-2">Description</label>
              <textarea
                value={newItem.description}
                onChange={(e) => updateNewItem('description', e.target.value)}
                className="w-full h-20 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white placeholder:text-[#ffffffb2] focus:border-[#30bdee] focus:bg-[#111111] transition-all text-sm p-3 resize-none"
                placeholder="Add item description..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <Button
                onClick={handleCloseAddItemModal}
                variant="outline"
                className="flex-1 border-[#333333] text-[#ffffffb2] hover:text-white hover:bg-[#ffffff12] rounded-lg"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveNewItem}
                className="flex-1 bg-[#30bdee] hover:bg-[#2aa3d1] text-white rounded-lg"
              >
                Add Item
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Inventory Item"
        description="Are you sure you want to delete this item from your inventory? This action will permanently remove the item and cannot be undone."
        itemName={deleteItem?.name}
        isLoading={isDeleting}
      />
    </div>
  );
};