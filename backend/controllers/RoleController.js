import express from 'express'

var router= express.Router()

router.get('/',Hello)
router.post('/add',AddNewCategory);
router.get('/all',GetAll);
router.get('/level_info/:level',GetLevelCategoryInfo);
router.get('/parent/:id',GetAllParentId);
// router.put('/update',UpdateCategory);

// router.delete('/delete',DeleteCategory);


exports.CategoryRoute=router;