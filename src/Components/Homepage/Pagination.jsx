"use client";

import { Pagination } from "@heroui/react";
import Link from "next/link";

export function PaginationBasic({ totalPages, page }) {


    return (
        <Pagination className="justify-end">
            <Pagination.Content>
                <Pagination.Item>
                    <Link href={`funding?page=${page <= 1 ? 1 : Number(page) - 1}`}>
                        <Pagination.Previous isDisabled={page === 1}>
                            <Pagination.PreviousIcon />
                            <span>Previous</span>
                        </Pagination.Previous>
                    </Link>
                </Pagination.Item>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Pagination.Item key={p}>
                        <Link href={`funding?page=${p}`}>
                            <Pagination.Link isDisabled={page === 1}>
                                {p}
                            </Pagination.Link>
                        </Link>
                    </Pagination.Item>
                ))}
                <Pagination.Item>
                    <Link href={`funding?page=${page >= totalPages ? totalPages : Number(page) + 1}`}>
                        <Pagination.Next isDisabled={page === totalPages}>
                            <span>Next</span>
                            <Pagination.NextIcon />
                        </Pagination.Next>
                    </Link>
                </Pagination.Item>
            </Pagination.Content>
        </Pagination>
    );
}