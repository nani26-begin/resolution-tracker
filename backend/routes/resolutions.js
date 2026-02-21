const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// This file is used in server.js as require('./resolution-routes')
// But I'll create it as resolutions.js in routes folder and update server.js

// XP Constants
const XP_CREATE = 10;
const XP_UPDATE_PROGRESS = 5;
const XP_COMPLETE = 50;

const updateXP = async (userId, xpToAdd) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const newXP = user.xp + xpToAdd;
    const newLevel = Math.floor(newXP / 100) + 1;

    return await prisma.user.update({
        where: { id: userId },
        data: {
            xp: newXP,
            level: newLevel
        }
    });
};

// Middleware to use auth
const authMiddleware = require('../middleware/auth');

// Get all resolutions for a user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const resolutions = await prisma.resolution.findMany({
            where: { userId: req.user.id },
            orderBy: { createdAt: 'desc' }
        });
        res.json(resolutions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Create resolution
router.post('/', authMiddleware, async (req, res) => {
    const { title, description } = req.body;
    try {
        const resolution = await prisma.resolution.create({
            data: {
                title,
                description,
                userId: req.user.id
            }
        });

        await updateXP(req.user.id, XP_CREATE);
        res.json(resolution);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update resolution (progress)
router.put('/:id', authMiddleware, async (req, res) => {
    const { title, description, progress, status } = req.body;
    try {
        const oldResolution = await prisma.resolution.findUnique({ where: { id: req.params.id } });

        if (!oldResolution || oldResolution.userId !== req.user.id) {
            return res.status(404).json({ message: 'Resolution not found' });
        }

        const resolution = await prisma.resolution.update({
            where: { id: req.params.id },
            data: {
                title: title !== undefined ? title : oldResolution.title,
                description: description !== undefined ? description : oldResolution.description,
                progress: progress !== undefined ? progress : oldResolution.progress,
                status: status !== undefined ? status : oldResolution.status
            }
        });

        // XP Logic
        if (progress !== undefined && progress > oldResolution.progress) {
            await updateXP(req.user.id, XP_UPDATE_PROGRESS);
        }

        if (status === 'Completed' && oldResolution.status !== 'Completed') {
            await updateXP(req.user.id, XP_COMPLETE);
        }

        res.json(resolution);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete resolution
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const resolution = await prisma.resolution.findUnique({ where: { id: req.params.id } });
        if (!resolution || resolution.userId !== req.user.id) {
            return res.status(404).json({ message: 'Resolution not found' });
        }

        await prisma.resolution.delete({ where: { id: req.params.id } });
        res.json({ message: 'Resolution removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
