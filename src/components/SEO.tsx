import { useEffect } from "react";

interface SEOProps {
    title: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
}

export const SEO = ({ title, description, keywords, ogImage }: SEOProps) => {
    useEffect(() => {
        const fullTitle = `${title} | Alpha Investment Management`;
        document.title = fullTitle;

        // Update Meta Description
        if (description) {
            let metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute("content", description);
            } else {
                metaDescription = document.createElement("meta");
                metaDescription.setAttribute("name", "description");
                metaDescription.setAttribute("content", description);
                document.head.appendChild(metaDescription);
            }

            // OpenGraph Description
            const ogDescription = document.querySelector('meta[property="og:description"]');
            if (ogDescription) ogDescription.setAttribute("content", description);
        }

        // Update Keywords
        if (keywords) {
            let metaKeywords = document.querySelector('meta[name="keywords"]');
            if (metaKeywords) {
                metaKeywords.setAttribute("content", keywords);
            }
        }

        // Update OpenGraph Title
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute("content", fullTitle);

        // Update OpenGraph Image
        if (ogImage) {
            const metaOgImage = document.querySelector('meta[property="og:image"]');
            if (metaOgImage) metaOgImage.setAttribute("content", ogImage);
        }
    }, [title, description, keywords, ogImage]);

    return null;
};
