import React, { useState } from 'react';
import { Heart } from 'lucide-react';

const SocialMediaEngagementCalculator = () => {
  const [platform, setPlatform] = useState<string>('instagram');
  const [followers, setFollowers] = useState<number>(0);
  const [likes, setLikes] = useState<number>(0);
  const [comments, setComments] = useState<number>(0);
  const [shares, setShares] = useState<number>(0);
  const [saves, setSaves] = useState<number>(0);
  const [posts, setPosts] = useState<number>(1);
  const [timeframe, setTimeframe] = useState<string>('post');

  const totalEngagements = likes + comments + shares + saves;
  const engagementRate = followers > 0 ? (totalEngagements / followers) * 100 : 0;
  const avgEngagementPerPost = posts > 0 ? totalEngagements / posts : totalEngagements;

  const getBenchmarks = () => {
    const benchmarks = {
      instagram: { excellent: 6, good: 3, average: 1.5 },
      facebook: { excellent: 3, good: 1.5, average: 0.5 },
      twitter: { excellent: 2, good: 1, average: 0.5 },
      linkedin: { excellent: 4, good: 2, average: 1 },
      tiktok: { excellent: 15, good: 8, average: 4 },
      youtube: { excellent: 8, good: 4, average: 2 }
    };
    return benchmarks[platform as keyof typeof benchmarks] || benchmarks.instagram;
  };

  const getEngagementStatus = () => {
    const benchmark = getBenchmarks();
    if (engagementRate >= benchmark.excellent) return { status: 'Excellent', color: 'text-green-600' };
    if (engagementRate >= benchmark.good) return { status: 'Good', color: 'text-blue-600' };
    if (engagementRate >= benchmark.average) return { status: 'Average', color: 'text-yellow-600' };
    return { status: 'Below Average', color: 'text-red-600' };
  };

  const engagementStatus = getEngagementStatus();
  const benchmark = getBenchmarks();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Heart className="w-6 h-6 text-pink-600" />
        <h3 className="text-lg font-semibold">Social Media Engagement Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Platform
          </label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
            <option value="twitter">Twitter</option>
            <option value="linkedin">LinkedIn</option>
            <option value="tiktok">TikTok</option>
            <option value="youtube">YouTube</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Followers/Subscribers
          </label>
          <input
            type="number"
            value={followers || ''}
            onChange={(e) => setFollowers(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="10000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Likes/Reactions
          </label>
          <input
            type="number"
            value={likes || ''}
            onChange={(e) => setLikes(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comments
          </label>
          <input
            type="number"
            value={comments || ''}
            onChange={(e) => setComments(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Shares/Retweets
          </label>
          <input
            type="number"
            value={shares || ''}
            onChange={(e) => setShares(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="25"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Saves/Bookmarks
          </label>
          <input
            type="number"
            value={saves || ''}
            onChange={(e) => setSaves(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="15"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Posts
          </label>
          <input
            type="number"
            value={posts || ''}
            onChange={(e) => setPosts(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timeframe
          </label>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="post">Per Post</option>
            <option value="week">Weekly</option>
            <option value="month">Monthly</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Engagement Analysis:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Engagement Rate</p>
            <p className={`text-3xl font-bold ${engagementStatus.color}`}>
              {engagementRate.toFixed(2)}%
            </p>
            <p className={`text-sm font-medium ${engagementStatus.color}`}>
              {engagementStatus.status}
            </p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Total Engagements</p>
            <p className="text-3xl font-bold text-pink-600">
              {totalEngagements.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-pink-50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Engagement Breakdown:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-2 bg-white rounded">
            <p className="text-sm text-gray-600">Likes</p>
            <p className="text-lg font-bold text-red-500">{likes.toLocaleString()}</p>
            <p className="text-xs text-gray-500">
              {followers > 0 ? ((likes / followers) * 100).toFixed(1) : 0}%
            </p>
          </div>
          <div className="text-center p-2 bg-white rounded">
            <p className="text-sm text-gray-600">Comments</p>
            <p className="text-lg font-bold text-blue-500">{comments.toLocaleString()}</p>
            <p className="text-xs text-gray-500">
              {followers > 0 ? ((comments / followers) * 100).toFixed(1) : 0}%
            </p>
          </div>
          <div className="text-center p-2 bg-white rounded">
            <p className="text-sm text-gray-600">Shares</p>
            <p className="text-lg font-bold text-green-500">{shares.toLocaleString()}</p>
            <p className="text-xs text-gray-500">
              {followers > 0 ? ((shares / followers) * 100).toFixed(1) : 0}%
            </p>
          </div>
          <div className="text-center p-2 bg-white rounded">
            <p className="text-sm text-gray-600">Saves</p>
            <p className="text-lg font-bold text-purple-500">{saves.toLocaleString()}</p>
            <p className="text-xs text-gray-500">
              {followers > 0 ? ((saves / followers) * 100).toFixed(1) : 0}%
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">{platform.charAt(0).toUpperCase() + platform.slice(1)} Benchmarks:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• <span className="text-green-600 font-medium">Excellent:</span> {benchmark.excellent}%+ engagement rate</p>
          <p>• <span className="text-blue-600 font-medium">Good:</span> {benchmark.good}%+ engagement rate</p>
          <p>• <span className="text-yellow-600 font-medium">Average:</span> {benchmark.average}%+ engagement rate</p>
          <p>• <span className="text-red-600 font-medium">Below Average:</span> Under {benchmark.average}% engagement rate</p>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Improvement Tips:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Post consistently at optimal times for your audience</p>
          <p>• Use relevant hashtags and trending topics</p>
          <p>• Create engaging, high-quality visual content</p>
          <p>• Respond to comments and engage with followers</p>
          <p>• Use stories, reels, and platform-specific features</p>
          <p>• Collaborate with influencers and other accounts</p>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaEngagementCalculator;