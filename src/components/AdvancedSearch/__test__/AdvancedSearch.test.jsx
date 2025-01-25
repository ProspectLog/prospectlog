import { render, screen, fireEvent } from "@testing-library/react";
import AdvancedSearch from "../AdvancedSearch";

describe("AdvancedSearch Component", () => {
    test("renders Ajouter un Prospect button", () => {
        render(<AdvancedSearch />);
        const buttonElement = screen.getByText(/Ajouter un Prospect/i);
        expect(buttonElement).toBeInTheDocument();
    });

    test("opens modal on Ajouter un Prospect button click", () => {
        render(<AdvancedSearch />);
        const buttonElement = screen.getByText(/Ajouter un Prospect/i);
        fireEvent.click(buttonElement);
        const modalTitle = screen.getByText(/Ajouter un Prospect/i);
        expect(modalTitle).toBeInTheDocument();
    });

    test("closes modal on Fermer button click", () => {
        render(<AdvancedSearch />);
        const openButton = screen.getByText(/Ajouter un Prospect/i);
        fireEvent.click(openButton);
        const closeButton = screen.getByText(/Fermer/i);
        fireEvent.click(closeButton);
        expect(closeButton).not.toBeInTheDocument();
    });

    test("renders dropdowns correctly", () => {
        render(<AdvancedSearch />);
        const dropdowns = screen.getAllByText(/test/i);
        expect(dropdowns.length).toBe(4);
    });

    test("renders search input", () => {
        render(<AdvancedSearch />);
        const searchInput = screen.getByPlaceholderText(/Rechercher/i);
        expect(searchInput).toBeInTheDocument();
    });

    test("handles form input changes", () => {
        render(<AdvancedSearch />);
        const openButton = screen.getByText(/Ajouter un Prospect/i);
        fireEvent.click(openButton);

        const nomInput = screen.getByPlaceholderText(/Nom/i);
        fireEvent.change(nomInput, { target: { value: "John Doe" } });
        expect(nomInput.value).toBe("John Doe");

        const contactInput = screen.getByPlaceholderText(/Contacté par/i);
        fireEvent.change(contactInput, { target: { value: "Jane Smith" } });
        expect(contactInput.value).toBe("Jane Smith");
    });

    test("submits the form", async () => {
        render(<AdvancedSearch />);
        const openButton = screen.getByText(/Ajouter un Prospect/i);
        fireEvent.click(openButton);

        const submitButton = screen.getByText(/Ajouter/i);
        fireEvent.click(submitButton);

        const modalTitle = screen.queryByText(/Ajouter un Prospect/i);
        expect(modalTitle).not.toBeInTheDocument();
    });
});