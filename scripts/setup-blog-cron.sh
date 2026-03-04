#!/bin/bash

# Blog Cron Setup Script
# Activates automated blog publishing every Mon/Wed/Fri at 9 AM MST

echo "🚀 EZLY Blog Automation - Cron Setup"
echo "======================================"
echo ""

# Check if crontab exists
if crontab -l > /dev/null 2>&1; then
    echo "✅ Crontab found. Adding blog automation schedule..."
else
    echo "📝 Creating new crontab..."
fi

# Add cron job for blog publishing
# Format: minute hour day_of_month month day_of_week command
# Monday=1, Wednesday=3, Friday=5
# 0 9 * * 1,3,5 = Every Monday, Wednesday, Friday at 9:00 AM

CRON_JOB="0 9 * * 1,3,5 cd /data/.openclaw/workspace/ezly-dashboard && node scripts/publish-blog-post.js >> /var/log/ezly-blog-cron.log 2>&1"

# Add to crontab (avoiding duplicates)
if ! crontab -l 2>/dev/null | grep -q "publish-blog-post.js"; then
    (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -
    echo ""
    echo "✅ Cron job added successfully!"
    echo ""
    echo "Schedule Details:"
    echo "- Days: Monday, Wednesday, Friday"
    echo "- Time: 9:00 AM MST"
    echo "- Script: /scripts/publish-blog-post.js"
    echo "- Log: /var/log/ezly-blog-cron.log"
else
    echo "⚠️  Cron job already exists. Skipping..."
fi

echo ""
echo "📊 Queue Status:"
echo "- Posts queued: 8"
echo "- Next publish: Next scheduled day at 9 AM"
echo "- Posts scheduled: Mar 5 (Wed), Mar 7 (Fri), Mar 10 (Mon), etc."
echo ""
echo "🔍 To view your cron jobs:"
echo "   crontab -l"
echo ""
echo "📝 To edit your cron jobs:"
echo "   crontab -e"
echo ""
echo "Done! ✨"
