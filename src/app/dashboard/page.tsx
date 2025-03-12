"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Users from "../users/page";
import Cookies from "js-cookie";
import { motion } from "framer-motion";

export default function Dashboard() {
	const [selectedContent, setSelectedContent] = useState("content1");
	const [loading, setLoading] = useState(false);
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const [fadeOut, setFadeOut] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		const token = Cookies.get("authToken");
		if (!token) router.push("/");
	}, [router]);

	const handleClick = (content: string) => {
		if (selectedContent === content) return;

		setLoading(true);

		setTimeout(() => {
			setSelectedContent(content);
			setLoading(false);
		}, 1800);
	};

	const handleLogout = () => {
		setShowLogoutModal(true);
	};

	const confirmLogout = () => {
		setFadeOut(true);
		setTimeout(() => {
				Cookies.remove("authToken");
				router.push("/");
			}, 500);
	};

	const cancelLogout = () => {
		setShowLogoutModal(false);
	};

	const renderContent = () => {
		switch (selectedContent) {
			case "content1":
				return <Users />;

			case "content2":
				return (
					<div>
						Content 2 - podgląd wszytskich kurierów, zarządzanie kurierami ale
						nie ich danymi, podględ paczek przypisanych do nich ich stanu oraz
						histori,
					</div>
				);
			case "content3":
				return (
					<div>
						Content 3 - podgląd paczek zakonczonych, aktualnie dostarczanych,
						nie przetworzonych, wygodne przypisanie wielu paczek do jednego
						kuriera
					</div>
				);
			case "content4":
				return <div>Content 4 - zmiana hasla admina</div>;
			case "content5":
				return (
					<div>
						Content 5 - mozliwosc włączenia/wyłączenia automatycznie
						przydzieljącego paczki do kurierów, mozliwosc wyłaczenia aplikacji,
						zarządzanie opcjami takimi jak ceny dostawy w czasie x,
					</div>
				);
			default:
				return <div>Wybierz opcję z menu po lewej stronie</div>;
		}
	};

	return (
		<>
			{/* Animacja fade-out formularza po potwierdzeniu wylogowania się */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: fadeOut ? 0 : 1 }} // Fade-out zaczyna się po kliknięciu
				transition={{ duration: 0.3 }}
				// className="bg-gray-900 text-white p-8 rounded-xl w-96 shadow-lg"
			>
				<div className="flex min-h-screen">
					{/* Lewa strona - Menu */}
					<div className="bg-gray-800 text-white w-64 p-6 flex flex-col gap-4">
						<button
							onClick={() => handleClick("content1")}
							className={`p-3 rounded transition ${selectedContent === "content1"
									? "bg-blue-700 border-2 border-blue-500"
									: "bg-blue-600 hover:bg-blue-700"
								}`}
						>
							Users
						</button>
						<button
							onClick={() => handleClick("content2")}
							className={`p-3 rounded transition ${selectedContent === "content2"
									? "bg-blue-700 border-2 border-blue-500"
									: "bg-blue-600 hover:bg-blue-700"
								}`}
						>
							Couriers
						</button>
						<button
							onClick={() => handleClick("content3")}
							className={`p-3 rounded transition ${selectedContent === "content3"
									? "bg-blue-700 border-2 border-blue-500"
									: "bg-blue-600 hover:bg-blue-700"
								}`}
						>
							Packages
						</button>
						<button
							onClick={() => handleClick("content4")}
							className={`p-3 rounded transition ${selectedContent === "content4"
									? "bg-blue-700 border-2 border-blue-500"
									: "bg-blue-600 hover:bg-blue-700"
								}`}
						>
							New password
						</button>

						<button
							onClick={() => handleClick("content5")}
							className={`p-3 rounded transition ${selectedContent === "content5"
									? "bg-blue-700 border-2 border-blue-500"
									: "bg-blue-600 hover:bg-blue-700"
								}`}
						>
							Application
						</button>

						{/* Przycisk Wyloguj */}
						<button
							onClick={handleLogout}
							className="mt-6 p-3 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition w-full"
						>
							Wyloguj się
						</button>
					</div>

					{/* Prawa strona - Content */}
					<div className="flex-1 bg-gray-900 text-white p-6">
						{/* Pokazanie animacji ładowania podczas przejścia */}
						{loading ? (
							<div className="flex justify-center items-center min-h-full">
								<div className="w-16 h-16 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
							</div>
						) : (
							renderContent() // Renderowanie wybranego contentu po zakończeniu ładowania
						)}
					</div>

					{/* Modal Wylogowania */}
					{showLogoutModal && (
						<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
							<div className="bg-gray-800 p-6 rounded-lg w-96 shadow-lg">
								<h2 className="text-xl font-semibold text-center text-white mb-4">
									Czy na pewno chcesz się wylogować?
								</h2>
								<div className="flex gap-4 justify-center">
									<button
										onClick={confirmLogout}
										className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition"
									>
										Tak
									</button>
									<button
										onClick={cancelLogout}
										className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded transition"
									>
										Anuluj
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</motion.div>
		</>
	);
}
