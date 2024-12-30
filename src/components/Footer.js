import React from 'react';
import { Typography } from '@material-ui/core';
import '../style/style.css';

export default function Footer() {
    return (
        <div style={{
            position: "fixed",
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#08746a",
            color: "#ffffff",
            opacity: 0.9,
            width: "100%",
        }}>
            <Typography align="center">
                {'Content and resources assembled by '} 
                <a
                style={{ color: '#D8D8D8' }}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.ling.upenn.edu/~gene/home.html"
                >
                <u>Gene Buckley</u>
                </a>
                {'. Initial implementation done by '}
                <a
                style={{ color: '#D8D8D8' }}
                target="_blank"
                rel="noopener noreferrer"
                href="https://jhtomlee.com"
                >
                <u>Tom Lee</u>
                </a>
                {', with further development by '}
                <a
                style={{ color: '#D8D8D8' }}
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/bcho04"
                >
                <u>Brandon Cho</u>
                </a>
                {'.'}
            </Typography>
        </div>
    )
}