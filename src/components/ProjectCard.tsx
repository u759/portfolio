"use client";

import { useState } from "react";
import { AvatarGroup, Carousel, Flex, Heading, SmartLink, Text } from "@/once-ui/components";
import { ProjectModal } from "./ProjectModal";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
    href: string;
    priority?: boolean;
    images: string[];
    title: string;
    content: string;
    description: string;
    avatars: { src: string }[];
    link: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    href,
    images = [],
    title,
    content,
    description,
    avatars,
    link,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Flex
                fillWidth gap="m"
                direction="column">
                <Carousel
                    sizes="(max-width: 960px) 100vw, 960px"
                    images={images.map(image => ({
                    src: image,
                    alt: title
                }))}/>
                <Flex
                    mobileDirection="column"
                    fillWidth paddingX="s" paddingTop="12" paddingBottom="24" gap="l">
                    {title && (
                        <Flex
                            flex={5}>
                            <Heading
                                as="h2"
                                wrap="balance"
                                variant="heading-strong-xl"
                                style={{ cursor: 'pointer' }}
                                className={styles.hover}
                                onClick={handleCardClick}>
                                {title}
                            </Heading>
                        </Flex>
                    )}
                {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
                    <Flex
                        flex={7} direction="column"
                        gap="16">
                        {avatars?.length > 0 && (
                            <AvatarGroup
                                avatars={avatars}
                                size="m"
                                reverse/>
                        )}
                        {description?.trim() && (
                            <Text
                                wrap="balance"
                                variant="body-default-s"
                                onBackground="neutral-weak">
                                {description}
                            </Text>
                        )}
                        <Flex gap="24" wrap>
                            {content?.trim() && (
                                <SmartLink
                                    suffixIcon="arrowRight"
                                    style={{margin: '0', width: 'fit-content'}}
                                    href={href}>
                                        <Text
                                            variant="body-default-s">
                                        Read case study
                                        </Text>
                                </SmartLink>
                            )}
                            {link && (
                                <SmartLink
                                    suffixIcon="arrowUpRightFromSquare"
                                    style={{ margin: "0", width: "fit-content" }}
                                    href={link}>
                                    <Text variant="body-default-s">View project</Text>
                                </SmartLink>
                            )}
                        </Flex>
                    </Flex>
                )}
            </Flex>
        </Flex>

        {/* Project Modal */}
        <ProjectModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            project={{
                title,
                description,
                content,
                images,
                avatars,
                link,
                href,
            }}
        />
        </>
    );
};
