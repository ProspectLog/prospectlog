import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import AdvancedSearch from "../AdvancedSearch"; // après tous les mocks
import { create } from "motion/react-client";




// Mock de Firestore
vi.mock("firebase/firestore", () => ({
  getFirestore: vi.fn(),
  collection: vi.fn().mockImplementation(() => {}),
  addDoc: vi.fn().mockResolvedValue({ id: "mocked-doc-id" }), // Mock de l'ajout de document
}));

describe("Modal component", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Nettoie les mocks avant chaque test
  });

  it("ne doit pas s'afficher si isOpen est à false", () => {
    render(<AdvancedSearch />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("doit s'afficher si isOpen est à true", () => {
    render(<AdvancedSearch />);
    fireEvent.click(screen.getByText("Ajouter un Prospect"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("doit envoyer les données à Firestore après soumission du formulaire", async () => {
    render(<AdvancedSearch />);
    fireEvent.click(screen.getByText("Ajouter un Prospect")); // Ouvre la modal

    // Remplissage du formulaire
    fireEvent.change(screen.getByPlaceholderText("Nom"), { target: { value: "Alice" } });
    fireEvent.change(screen.getByPlaceholderText("Contacté par"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("Tel"), { target: { value: "1234567890" } });
    fireEvent.change(screen.getByPlaceholderText("Origine"), { target: { value: "LinkedIn" } });
    fireEvent.change(screen.getByPlaceholderText("Métier"), { target: { value: "Développeur" } });
    fireEvent.change(screen.getByPlaceholderText("Date"), { target: { value: "2025-02-01" } });

    // Soumission du formulaire
    fireEvent.submit(screen.getByText("Ajouter"));

    // Vérification que `addDoc` a bien été appelé avec les bonnes valeurs
    await waitFor(() => {
      expect(addDoc).toHaveBeenCalledTimes(1);
      expect(addDoc).toHaveBeenCalledWith(collection(getFirestore(), "prospects"), {
        nom: "Alice",
        contact: "John",
        tel: "1234567890",
        origine: "LinkedIn",
        metier: "Développeur",
        rappel: "2025-02-01",
        statut: "pending",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),

      });
    });

    // Vérification que le formulaire est bien réinitialisé
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();  });
});
