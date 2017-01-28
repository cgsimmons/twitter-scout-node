import express from 'express';
import PassportTwitter from './twitter';

const router = express.Router();

// route twitter authentication
router.get('/twitter', PassportTwitter.authenticate('twitter'));
router.get('/twitter/callback',
  PassportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication
    res.redirect(`/user/${req.user.id}`);
  });
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

export default router;
