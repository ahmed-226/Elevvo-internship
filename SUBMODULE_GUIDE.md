# Submodule Management Guide

This repository uses Git submodules to include external projects for tasks 6 and 8.

## Current Submodules

### Task 6: WorkSphere (Freelancer Dashboard)
- **Repository**: https://github.com/ahmed-226/WorkSphere.git
- **Path**: `task_6/`
- **Contains**: React-based dashboard with multiple screenshot images

### Task 8: Job Application Tracker
- **Repository**: https://github.com/ahmed-226/Job-Tracker.git
- **Path**: `task_8/`
- **Contains**: Job tracking application with dashboard screenshots

## Working with Submodules

### Initial Setup (Already Done)
```bash
# Clone repository with submodules
git clone --recursive https://github.com/ahmed-226/Elevvo-internship.git

# Or if already cloned, initialize submodules
git submodule init
git submodule update
```

### Updating Submodules
```bash
# Update all submodules to latest commits
git submodule update --remote

# Update specific submodule
git submodule update --remote task_6
git submodule update --remote task_8
```

### Making Changes to Submodules
**Note**: You cannot directly modify submodule content from this repository.
To update submodule content:

1. Navigate to the original repository (WorkSphere or Job-Tracker)
2. Make changes and commit them
3. Return to this repository and update the submodule reference:
   ```bash
   cd task_6  # or task_8
   git pull origin main
   cd ..
   git add task_6  # or task_8
   git commit -m "Update submodule to latest version"
   ```

## Image Optimization for Submodules

The `.imgbot.yml` configuration in this repository will:
- ✅ Optimize images in the main repository (tasks 1-5, 7)
- ❌ NOT optimize images in submodules (tasks 6, 8)

**To optimize submodule images**:
1. Set up ImgBot on the individual repositories:
   - https://github.com/ahmed-226/WorkSphere
   - https://github.com/ahmed-226/Job-Tracker
2. Add `.imgbot.yml` configuration to each submodule repository
3. Enable ImgBot for those repositories separately

## Troubleshooting

### Submodule Directory is Empty
```bash
git submodule init
git submodule update
```

### Submodule Shows Modified Status
```bash
cd task_6  # or task_8
git status
# If changes are unintended:
git checkout .
# If changes should be committed:
git add . && git commit -m "Update submodule content"
```

### Cannot Access Submodule Images
Ensure submodules are properly initialized and updated:
```bash
ls -la task_6/public/  # Should show dashboard.png and other images
ls -la task_8/public/  # Should show dashboard.png and add-job.png
```

---

*For more information about image management, see [IMAGE_OPTIMIZATION.md](IMAGE_OPTIMIZATION.md)*