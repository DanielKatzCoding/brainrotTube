'use client';

import React from 'react';
import { Card, CardMedia } from "@mui/material";
export default function VideoCard({ title, src }: { title: string; src: string }) {

    return (
    <Card>
        <CardMedia
            component="video"
            title={title}
            src={src}
        />
    </Card>
    );
}