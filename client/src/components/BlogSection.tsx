import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Calendar, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  publishDate: Date;
  readTime: string;
  category: string;
  thumbnail: string;
  url: string;
}

const categoryColors: Record<string, string> = {
  "Business Growth": "bg-blue-500",
  "Business Transformation": "bg-indigo-500",
  "Pricing Strategy": "bg-green-500",
  "Team Building": "bg-purple-500",
  "Marketing": "bg-pink-500",
  "Finance": "bg-orange-500",
  "Productivity": "bg-teal-500",
  "Leadership": "bg-red-500"
};

const BlogSection = () => {
  const { data: blogData, isLoading, error } = useQuery({
    queryKey: ["/api/blog/posts"],
    queryFn: async () => {
      const response = await fetch("/api/blog/posts");
      if (!response.ok) {
        throw new Error("Failed to fetch blog posts");
      }
      return response.json();
    }
  });

  if (isLoading) {
    return (
      <section id="blog" className="mb-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded w-64 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-800 rounded-lg h-64"></div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  if (error || !blogData?.posts) {
    return (
      <section id="blog" className="mb-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Latest Blog Posts</h2>
            <p className="text-gray-400">Unable to load blog posts at this time.</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  const blogPosts: BlogPost[] = blogData.posts.map((post: any) => ({
    ...post,
    publishDate: new Date(post.publishDate)
  }));

  const [featuredPost, ...recentPosts] = blogPosts;

  const openBlog = () => {
    window.open("https://tradecoach.co.uk/blog", "_blank");
  };

  return (
    <section id="blog" className="mb-8">
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-white mb-6">BLOGS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post, index) => (
              <div 
                key={post.id}
                className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden group hover:border-gray-600 transition-all duration-300"
              >
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img 
                    src={post.thumbnail} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://images.unsplash.com/photo-150700321116${index + 9}-0a1dd7228f2d?w=400&h=225&fit=crop&crop=center`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    onClick={() => window.open(post.url, "_blank")}
                  >
                    Read More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default BlogSection;