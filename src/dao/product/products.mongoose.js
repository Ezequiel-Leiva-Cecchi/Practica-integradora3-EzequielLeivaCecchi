import productsModel from "../../models/porducts.model.js";

export class productMongoose {
    async getProducts() {
        return await productsModel.find().lean({ virtuals: true });
    }
    async getPaginatedProducts(query, paginationOptions) {
        const products = await productsModel.paginate(
            { title: { $regex: query ? query : '', $options: 'i' } },
            { ...paginationOptions, lean: true }
        );

        const totalPages = Math.ceil(products.total / paginationOptions.limit);

        const currentPage = paginationOptions.page || 1;
        const prevPage = currentPage > 1 ? currentPage - 1 : null;
        const nextPage = currentPage < totalPages ? currentPage + 1 : null;

        return {
            products: products.docs,
            currentPage,
            prevPage,
            nextPage,
            totalPages
        };
    }

    async getProductsById(id) {
        return await productsModel.findById(id).lean({ virtuals: true });
    }
    async getProductsByIds(products) {
        const groupProducts = await productsModel.find({ _id: { $in: products } }).lean({ virtuals: true });
        return groupProducts;
    }
    async addProduct(Object) {
        const newProduct = new productsModel(Object);
        await newProduct.save();
    }
    async editProduct({ id, Object }) {
        return await productsModel.findOneAndUpdate({ _id: id }, Object);
    }
    async deleteProduct(id) {
        return await productsModel.findOneAndDelete({ _id: id });
    }
}