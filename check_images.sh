#!/bin/bash

# Image Verification and Optimization Status Check
# This script verifies all images are properly uploaded and accessible

echo "🔍 Elevvo Internship Repository - Image Upload Verification"
echo "========================================================="
echo

# Check repository structure
echo "📁 Repository Structure Check:"
for task in task_1 task_2 task_3 task_4 task_5 task_6 task_7 task_8; do
    if [[ -d "$task" ]]; then
        if [[ -d "$task/.git" ]]; then
            echo "   $task/ ✅ (submodule)"
        else
            echo "   $task/ ✅ (directory)"
        fi
    else
        echo "   $task/ ❌ (missing)"
    fi
done
echo

# Check images referenced in README.md
echo "🖼️  Image Accessibility Check:"
images=(
    "task_1/image.png"
    "task_2/image.png"
    "task_3/image.png"
    "task_4/image.png"
    "task_5/image.png"
    "task_6/public/dashboard.png"
    "task_7/demo.gif"
    "task_8/public/dashboard.png"
)

total_images=${#images[@]}
accessible_images=0

for img in "${images[@]}"; do
    if [[ -f "$img" ]]; then
        size=$(ls -lh "$img" | awk '{print $5}')
        type=$(file -b --mime-type "$img")
        echo "   ✅ $img ($size, $type)"
        ((accessible_images++))
    else
        echo "   ❌ $img (missing)"
    fi
done
echo

# Image optimization setup check
echo "⚡ Image Optimization Setup:"
if [[ -f ".imgbot.yml" ]]; then
    echo "   ✅ ImgBot configuration exists"
    compression=$(grep "compression_level:" .imgbot.yml | awk '{print $2}')
    echo "   📊 Compression level: ${compression}%"
else
    echo "   ❌ ImgBot configuration missing"
fi

if [[ -f "IMAGE_OPTIMIZATION.md" ]]; then
    echo "   ✅ Image optimization documentation exists"
else
    echo "   ❌ Image optimization documentation missing"
fi

if [[ -f "SUBMODULE_GUIDE.md" ]]; then
    echo "   ✅ Submodule management guide exists"
else
    echo "   ❌ Submodule management guide missing"
fi
echo

# Large file identification
echo "📏 Large Files Requiring Optimization:"
large_files_found=false
for img in "${images[@]}"; do
    if [[ -f "$img" ]]; then
        size_bytes=$(stat -c%s "$img" 2>/dev/null || stat -f%z "$img" 2>/dev/null)
        if [[ $size_bytes -gt 500000 ]]; then  # > 500KB
            size_human=$(ls -lh "$img" | awk '{print $5}')
            echo "   🔍 $img ($size_human) - Consider optimization"
            large_files_found=true
        fi
    fi
done

if [[ "$large_files_found" == false ]]; then
    echo "   ✅ No files larger than 500KB found"
fi
echo

# Summary
echo "📊 Summary:"
echo "   Total Images Expected: $total_images"
echo "   Images Accessible: $accessible_images"
echo "   Missing Images: $((total_images - accessible_images))"
echo

if [[ $accessible_images -eq $total_images ]]; then
    echo "🎉 SUCCESS: All images are properly uploaded and accessible!"
    echo "   Ready for ImgBot optimization setup."
    exit 0
else
    echo "⚠️  WARNING: Some images are missing."
    echo "   Check submodule initialization: git submodule init && git submodule update"
    exit 1
fi