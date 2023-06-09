const router = require("express").Router();
const { User, BlogPost, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Get all blog posts for homepage
router.get("/", async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', { blogs });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get one blog post by id
router.get("/blog/:id", async (req, res) => {
  try {
    const blogData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });

    const blog = blogData.get({ plain: true });
    res.render("blog", { blog, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get dashboard - requires user to be logged in
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ["password"] },
      include: [{ model: BlogPost }],
    });

    const user = userData.get({ plain: true });
    res.render("dashboard", { user, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get login
router.get('/login', (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('/');
		return;
	}

	res.render('login');
});

// GET logout
router.get('/logout', (req, res) => {
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	}
	res.redirect('/');
});

// Route for creating a blog post - requires user to be logged in
router.get("/create", withAuth, async (req, res) => {
  try {
    res.render("create", { loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route for editing a blog post - requires user to be logged in and be the author of the post
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const blogData = await BlogPost.findByPk(req.params.id, {
      include: [{ model: User }],
    });

    const blog = blogData.get({ plain: true });

    if (blog.user_id !== req.session.userId) {
      res.redirect("/dashboard");
      return;
    }

    res.render("edit", { blog, loggedIn: true });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route for creating a comment - requires user to be logged in
router.post('/blogpost/:id/comments', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      user_id: req.session.userId,
      blogpost_id: req.params.id,
    });
     res.status(200).json({ message: 'Comment created successfully' });
   } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// update comment, required loggedIn
router.put('/blogpost/:id/comments', withAuth, async (req, res) => {
	try {
		const comment = await Comment.findByPk(req.params.commentId);
		if (comment.author_id !== req.session.userId) {
			res.status(403).json({ message: 'Not your comment!' });
			return;
		}
		const updatedComment = await Comment.update(req.body, {
			where: {
				id: req.params.commentId,
			},
		});
		res.status(200).json(updatedComment);
	} catch (err) {
		res.status(500).json(err);
	}
});

// delete comment, required loggedIn
router.delete('/blog/:id/comments', withAuth, async (req, res) => {
	try {
		// Must be author of comment to delete it
		const comment = await Comment.findByPk(req.params.commentId);
		if (comment.author_id !== req.session.userId) {
			res.status(403).json({ message: 'Not your comment!' });
			return;
		}
		const deletedComment = await Comment.destroy({
			where: {
				id: req.params.commentId,
			},
		});
		res.status(200).json(deletedComment);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
