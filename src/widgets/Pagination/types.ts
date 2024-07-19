export interface IPagintaion {
	pages: number;
	currentPage: number;
	onChangePage: (currentPage: number) => void;
}