import useForm from "../hooks/useForm";
import { useEffect, useState } from "react";
import { Modal } from "../components/ui/Modal/Modal"; 
import Table from "../components/ui/Table/Table";
import useItemsStore from "../store/useItemsStore";

const Admin = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortKey, setSortKey] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");

    const { items, fetchItems, addItem, deleteItem } = useItemsStore();

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const { formValues, handleInput, resetForm } = useForm({
        name: "",
        category: "",
        price: "",
        rating: "",
        description: "",
    });

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (selectedItem) {
            // Логика редактирования
            // editItem(selectedItem.id, formValues);
        } else {
            addItem(formValues);
        }
        closeModal();
    };

    const handleRowClick = (rowData) => {
        setSelectedItem(rowData);
        setModalOpen(true);
        setIsEditing(false);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedItem(null);
        setIsEditing(false);
        resetForm();
    };

    const handleDeleteItem = (id) => {
        deleteItem(id);
    };

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedItems = filteredItems.sort((a, b) => {
        const modifier = sortOrder === "asc" ? 1 : -1;
        if (a[sortKey] < b[sortKey]) return -1 * modifier;
        if (a[sortKey] > b[sortKey]) return 1 * modifier;
        return 0;
    });

    return (
        <section className="admin bg-gray-50 min-h-screen p-6">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
                <h2 className="mb-6 text-4xl font-extrabold text-gray-900">Управление товарами</h2>

                <div className="flex mb-6 items-center space-x-4">
                    <input
                        type="text"
                        placeholder="🔍 Поиск..."
                        className="border rounded-lg p-2 w-full shadow-lg focus:outline-none focus:ring focus:ring-blue-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        className="bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-700 transition duration-200"
                        onClick={() => setSearchTerm("")}
                    >
                        Сбросить
                    </button>
                </div>

                <div className="flex mb-6 space-x-4">
                    <select
                        className="border rounded-lg p-2 shadow-lg"
                        value={sortKey}
                        onChange={(e) => setSortKey(e.target.value)}
                    >
                        <option value="name">Название</option>
                        <option value="category">Категория</option>
                        <option value="price">Цена</option>
                        <option value="rating">Рейтинг</option>
                    </select>
                    <select
                        className="border rounded-lg p-2 shadow-lg"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="asc">По возрастанию</option>
                        <option value="desc">По убыванию</option>
                    </select>
                </div>

                <button
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow transition duration-200"
                    onClick={() => {
                        setSelectedItem(null);
                        setIsEditing(true);
                        setModalOpen(true);
                    }}
                >
                    ➕ Добавить товар
                </button>

                <Table
                    headers={[
                        { key: "name", title: "Название" },
                        { key: "category", title: "Категория" },
                        { key: "price", title: "Цена" },
                        { key: "rating", title: "Рейтинг" },
                        { key: "description", title: "Описание" },
                        { key: "actions", title: "Действия" }, 
                    ]}
                    data={sortedItems.map(item => ({
                        ...item,
                        actions: (
                            <button
                                onClick={() => handleDeleteItem(item.id)}
                                className="text-red-600 hover:text-red-700 transition duration-200 font-semibold"
                            >
                                Удалить
                            </button>
                        )
                    }))}
                    onRowClick={handleRowClick} // Изменено на onRowClick
                />

                {isModalOpen && (
                    <Modal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        title={selectedItem ? (isEditing ? "Редактирование товара" : "Информация о товаре") : "Добавление нового товара"}
                    >
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Название товара</label>
                                <input
                                    className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
                                    name="name"
                                    type="text"
                                    value={formValues.name || selectedItem?.name || ""}
                                    onChange={handleInput}
                                    placeholder="Введите название"
                                    readOnly={!isEditing}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Категория товара</label>
                                <select
                                    className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
                                    name="category"
                                    value={formValues.category || selectedItem?.category || ""}
                                    onChange={handleInput}
                                    disabled={!isEditing}
                                >
                                    <option value="">Выберите категорию</option>
                                    <option value="Sports">Спорт</option>
                                    <option value="Fashion">Мода</option>
                                    <option value="Electronics">Электроника</option>
                                    <option value="Home & Garden">Дом и Сад</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Цена товара (в долларах)</label>
                                <input
                                    className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
                                    name="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={formValues.price || selectedItem?.price || ""}
                                    onChange={handleInput}
                                    placeholder="Введите цену"
                                    readOnly={!isEditing}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">Рейтинг товара (1-5)</label>
                                <select
                                    className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
                                    name="rating"
                                    value={formValues.rating || selectedItem?.rating || ""}
                                    onChange={handleInput}
                                    disabled={!isEditing}
                                >
                                    <option value="">Выберите рейтинг</option>
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <option key={value} value={value}>{value}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Описание товара</label>
                                <textarea
                                    className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
                                    name="description"
                                    value={formValues.description || selectedItem?.description || ""}
                                    onChange={handleInput}
                                    placeholder="Введите описание"
                                    readOnly={!isEditing}
                                />
                            </div>
                            <button
                                type="submit"
                                className={`mt-4 bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200 ${!isEditing ? 'hidden' : ''}`}
                            >
                                Сохранить
                            </button>
                        </form>
                    </Modal>
                )}
            </div>
        </section>
    );
};

export default Admin;
