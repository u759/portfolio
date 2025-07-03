"use client";

import React, { useEffect } from "react";
import { Dialog, Flex, Text, Carousel, AvatarGroup, Button, Tag, Heading } from "@/once-ui/components";

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: {
        title: string;
        description: string;
        content: string;
        images: string[];
        avatars: { src: string }[];
        link: string;
        href: string;
    };
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
    isOpen,
    onClose,
    project,
}) => {
    // Extract technologies from description or content (simple approach)
    const extractTechnologies = () => {
        const techPattern = /(React|JavaScript|TypeScript|Python|Java|MongoDB|Spring Boot|Docker|Linux|Arduino|C\+\+|C|Raspberry Pi|ESP32|STM32|JavaFX|PostgreSQL|MySQL|Node\.js|Express|Git|Redux|Next\.js|Supabase|HTML|CSS|SCSS|Verilog|SystemVerilog|FPGA|PCB|IoT|API|REST|GraphQL|AWS|Azure|GCP|Firebase|Tailwind|Bootstrap|Ant Design|Material UI|Vue\.js|Angular|Laravel|PHP|Ruby|Rails|Django|Flask|Swift|Kotlin|Flutter|Dart|Go|Rust|Electron|Webpack|Vite|Babel)/gi;
        const text = `${project.description} ${project.content}`;
        const matches = text.match(techPattern);
        return matches ? [...new Set(matches)] : [];
    };

    const technologies = extractTechnologies();

    // Prevent background scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            // Store the current scroll position
            const scrollY = window.scrollY;
            
            // Prevent scrolling on the body
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            
            return () => {
                // Restore scrolling and position
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                window.scrollTo(0, scrollY);
            };
        }
    }, [isOpen]);

    // Handle wheel events to prevent scroll chaining
    const handleWheel = (e: React.WheelEvent) => {
        const target = e.currentTarget as HTMLElement;
        const isAtTop = target.scrollTop === 0;
        const isAtBottom = target.scrollTop + target.clientHeight >= target.scrollHeight;
        
        // Prevent default if we're trying to scroll beyond boundaries
        if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
            e.preventDefault();
        }
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            title={project.title}
            description={project.description}
            style={{ maxWidth: '900px', width: '90vw' }}
        >
            <Flex 
                direction="column" 
                gap="l"
                onWheel={handleWheel}
                style={{ 
                    overflowY: 'auto',
                    maxHeight: '70vh'
                }}
            >
                {/* Project Images */}
                {project.images && project.images.length > 0 && (
                    <Carousel
                        sizes="(max-width: 960px) 100vw, 720px"
                        images={project.images.map(image => ({
                            src: image,
                            alt: project.title
                        }))}
                    />
                )}

                {/* Technologies Used */}
                {technologies.length > 0 && (
                    <Flex direction="column" gap="12">
                        <Heading variant="heading-strong-s">Technologies</Heading>
                        <Flex gap="8" wrap>
                            {technologies.slice(0, 8).map((tech, index) => (
                                <Tag key={index} variant="neutral" size="s">
                                    {tech}
                                </Tag>
                            ))}
                        </Flex>
                    </Flex>
                )}

                {/* Team Members */}
                {project.avatars && project.avatars.length > 0 && (
                    <Flex direction="column" gap="12">
                        <Heading variant="heading-strong-s">Team</Heading>
                        <AvatarGroup
                            avatars={project.avatars}
                            size="m"
                            reverse
                        />
                    </Flex>
                )}

                {/* Project Overview */}
                <Flex direction="column" gap="12">
                    <Heading variant="heading-strong-s">Overview</Heading>
                    <Text variant="body-default-m">
                        {project.description}
                    </Text>
                </Flex>

                {/* Key Features */}
                <Flex direction="column" gap="12">
                    <Heading variant="heading-strong-s">Key Features</Heading>
                    <Flex direction="column" gap="8">
                        {getKeyFeatures(project.title).map((feature, index) => (
                            <Flex key={index} gap="8" alignItems="flex-start">
                                <Text variant="body-default-s" style={{ minWidth: "8px", marginTop: "2px" }}>•</Text>
                                <Text variant="body-default-s">{feature}</Text>
                            </Flex>
                        ))}
                    </Flex>
                </Flex>

                {/* Action Buttons */}
                <Flex gap="12" wrap justifyContent="center" paddingTop="8">
                    {project.content?.trim() && (
                        <Button
                            href={project.href}
                            variant="secondary"
                            size="m"
                            suffixIcon="arrowRight"
                        >
                            Read case study
                        </Button>
                    )}
                    {project.link && (
                        <Button
                            href={project.link}
                            variant="primary"
                            size="m"
                            suffixIcon="arrowUpRightFromSquare"
                        >
                            View project
                        </Button>
                    )}
                </Flex>
            </Flex>
        </Dialog>
    );
};

// Helper function to get key features based on project title
function getKeyFeatures(title: string): string[] {
    const features: { [key: string]: string[] } = {
        "Home Lab": [
            "TrueNAS Scale Debian server for self-hosted open-source applications",
            "Docker containerization for easy deployment",
            "IoT integration with ESP8266 sensors",
            "Home automation with Home Assistant",
            "File server and media streaming via SMB, FileBrowser, and Immich",
            "Virtual machine management"
        ],
        "PantryPatrol": [
            "Ingredient and expiry date tracking",
            "Intelligent meal suggestions based on inventory",
            "JavaFX desktop application with modern UI",
            "Custom JSON-based local database",
            "RESTful API for data synchronization",
            "Cross-platform compatibility"
        ],
        "NewsMapper": [
            "Real-time news event visualization",
            "Interactive world map interface",
            "AI-powered news summarization using Gemini",
            "React.js frontend with responsive design",
            "Java Spring Boot backend API",
            "MongoDB for scalable data storage",
            "24-hour hackathon development"
        ]
    };

    // Find matching project by checking if title contains key words
    for (const [projectKey, projectFeatures] of Object.entries(features)) {
        if (title.toLowerCase().includes(projectKey.toLowerCase())) {
            return projectFeatures;
        }
    }

    // Default features if no specific match found
    return [
        "Modern and responsive design",
        "Clean, maintainable code architecture",
        "User-focused interface design",
        "Performance optimized implementation"
    ];
}
