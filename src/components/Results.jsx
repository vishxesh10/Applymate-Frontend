import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import styles from "./Results.module.css";

export default function Results({ data, onGenerateAnother }) {
    const [activeTab, setActiveTab] = useState(0); // Index of selected variation
    const [copied, setCopied] = useState(false);
    const [editedContent, setEditedContent] = useState("");

    const variations = data.variations || [];

    // Update edited content when tab changes
    useEffect(() => {
        if (variations[activeTab]) {
            setEditedContent(variations[activeTab].content);
        }
    }, [activeTab, variations]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(editedContent);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        // Set font
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);

        // Split text to fit page width
        const splitText = doc.splitTextToSize(editedContent, 180); // 180mm width

        // Add text to PDF
        doc.text(splitText, 15, 20); // x=15, y=20

        doc.save(`${data.company}_${data.type}.pdf`);
    };

    return (
        <div className={styles.container}>
            {/* Header Section */}
            <div className={styles.header}>
                <h1 className={styles.title}>✨ Your Content is Ready!</h1>
                <p className={styles.subtitle}>
                    AI-generated {data.type} for {data.company}
                </p>
            </div>

            {/* Metadata Cards */}
            <div className={styles.metadataGrid}>
                <div className={styles.metadataCard}>
                    <span className={styles.metadataLabel}>Domain</span>
                    <span className={styles.metadataValue}>{data.domain}</span>
                </div>
                <div className={styles.metadataCard}>
                    <span className={styles.metadataLabel}>Company</span>
                    <span className={styles.metadataValue}>{data.company}</span>
                </div>
                <div className={styles.metadataCard}>
                    <span className={styles.metadataLabel}>Experience</span>
                    <span className={styles.metadataValue}>{data.experience}</span>
                </div>
                <div className={styles.metadataCard}>
                    <span className={styles.metadataLabel}>Type</span>
                    <span className={styles.metadataValue}>{data.type}</span>
                </div>
            </div>

            {/* Variation Tabs */}
            <div className={styles.tabsContainer}>
                {variations.map((variant, index) => (
                    <button
                        key={index}
                        className={`${styles.tabButton} ${activeTab === index ? styles.activeTab : ''}`}
                        onClick={() => {
                            setActiveTab(index);
                            setCopied(false);
                        }}
                    >
                        {variant.title || `Option ${index + 1}`}
                    </button>
                ))}
            </div>

            {/* Content Display (Editable) */}
            <div className={styles.contentBox}>
                <div className={styles.contentHeader}>
                    <div className={styles.headerLeft}>
                        <h3>{variations[activeTab]?.title}</h3>
                        <span className={styles.editHint}>(You can edit the text below)</span>
                    </div>
                    <div className={styles.headerActions}>
                        <button
                            className={styles.pdfButton}
                            onClick={handleDownloadPDF}
                            title="Download as PDF"
                        >
                            ⬇️ PDF
                        </button>
                        <button
                            className={styles.copyButton}
                            onClick={handleCopy}
                            title="Copy to clipboard"
                        >
                            {copied ? "✓ Copied!" : "📋 Copy"}
                        </button>
                    </div>
                </div>

                <textarea
                    className={styles.contentTextarea}
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                />
            </div>

            {/* Action Buttons */}
            <div className={styles.actions}>
                <button
                    className={styles.primaryButton}
                    onClick={onGenerateAnother}
                >
                    ← Generate Another
                </button>
            </div>
        </div>
    );
}
